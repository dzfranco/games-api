import { injectable, inject } from 'inversify';
import { IGameService } from '../interfaces/service/igame.service';
import { IGame } from '../../common/models/game/igame';
import { IGamePersistence } from '../interfaces/persistence/igame.persistence';
import { Identifiers } from '../../common/identifiers';
import { InternalServerError, NotFoundError } from 'restify-errors';
import { IPublisherPersistence } from '../interfaces/persistence/ipublisher.persistence';
import { IPublisher } from '../../common/models/publisher/ipublisher';
import { subMonths } from 'date-fns';

@injectable()
export class GameService implements IGameService {
	private gamePersistence: IGamePersistence;
	private publisherPersistence: IPublisherPersistence;

	private readonly OLD_GAME_DISCOUNT_PERCENTAGE = 20;
	private readonly UPPER_BOUND_MONTHS_DISCOUNT = 12;
	private readonly LOWER_BOUND_MONTHS_DISCOUNT = 18;

	constructor(
		@inject(Identifiers.GAME_PERSISTENCE_IDENTIFIER) $gamePersistence: IGamePersistence,
		@inject(Identifiers.PUBLISHER_PERSISTENCE_IDENTIFIER) $publisherPersistence: IPublisherPersistence
	) {
		this.gamePersistence = $gamePersistence;
		this.publisherPersistence = $publisherPersistence;
	}

	/**
	 * @description
	 * @param  {IGame} gameData
	 * @return Promise<IGame>
	 * @memberof GameService
	 */
	public async saveGame(gameData: IGame): Promise<IGame> {
		try {
			const savedGame = await this.gamePersistence.createGame(gameData);
			return savedGame;
		} catch (error) {
			throw new InternalServerError(error, error.message);
		}
	}

	/**
	 * @description Gets the games from the database. This method should handle business logic.
	 * @return Promise<IGame[]>
	 * @memberof GameService
	 */
	public async getGames(limit: number, cursor: number): Promise<IGame[]> {
		try {
			const games = await this.gamePersistence.getGames(limit, cursor);
			return games;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	/**
	 * @description Gets a game given its id
	 * @param  {number} id
	 * @return Promise<IGame>
	 * @memberof GameService
	 */
	public async getGameById(id: number): Promise<IGame> {
		try {
			let foundGame: IGame = null;
			foundGame = await this.gamePersistence.getGameById(id);
			if (!foundGame) {
				throw new NotFoundError('Game not found');
			}
			return foundGame;
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw error;
			}
			throw new Error(error.message);
		}
	}

	/**
	 * @description Gets a game publisher given the game ID
	 * @param  {number} gameId
	 * @return IPublisher
	 * @memberof GameService
	 */
	public async getGamePublisher(gameId: number): Promise<IPublisher> {
		try {
			let foundGame: IGame = null;
			foundGame = await this.gamePersistence.getGameById(gameId);
			if (!foundGame) {
				throw new NotFoundError('Game not found');
			}
			const foundPublisher = await this.publisherPersistence.getGamePublisher(foundGame);
			if (!foundPublisher) {
				throw new NotFoundError('Publisher not found');
			}
			return foundPublisher;
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw error;
			}
			throw new InternalServerError(error, error.message);
		}
	}

	/**
	 * @description Updates a game
	 * @param  {IGame} gameData
	 * @return Promise<IGame>
	 * @memberof GameService
	 */
	public async updateGame(gameData: IGame): Promise<IGame> {
		try {
			const updatedGame = await this.gamePersistence.updateGame(gameData);
			if (updatedGame === undefined) {
				throw new NotFoundError('Game not found');
			}
			return updatedGame;
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw error;
			}
			throw new InternalServerError(error, error.message);
		}
	}

	/**
	 * @description Removes a game
	 * @param  {number} gameId
	 * @return Promise<IGame>
	 * @memberof GameService
	 */
	public async removeGame(gameId: number): Promise<IGame> {
		try {
			const updatedGame = await this.gamePersistence.removeGame(gameId);
			if (updatedGame === undefined) {
				throw new NotFoundError('Game not found');
			}
			return updatedGame;
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw error;
			}
			throw new InternalServerError(error, error.message);
		}
	}

	/**
	 * @description Discounts old games
	 * @return Promise<number>
	 * @memberof GameService
	 */
	public async discountGames(): Promise<number> {
		try {
			const now = new Date();
			const lowerBound = subMonths(now, this.LOWER_BOUND_MONTHS_DISCOUNT);
			const upperBound = subMonths(now, this.UPPER_BOUND_MONTHS_DISCOUNT);
			const affected = await this.gamePersistence.discountGames(
				this.OLD_GAME_DISCOUNT_PERCENTAGE,
				lowerBound,
				upperBound
			);
			return affected;
		} catch (error) {
			throw new InternalServerError(error, error.message);
		}
	}

	/**
	 * @description Removes old games
	 * @return Promise<number>
	 * @memberof GameService
	 */
	public async removeOldGames(): Promise<number> {
		try {
			const now = new Date();
			const lowerBound = subMonths(now, this.LOWER_BOUND_MONTHS_DISCOUNT);
			const affected = await this.gamePersistence.removeOldGames(lowerBound);
			return affected;
		} catch (error) {
			throw new InternalServerError(error, error.message);
		}
	}
}
