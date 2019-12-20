import { injectable, inject } from 'inversify';
import { format } from 'date-fns';
import { IGame } from '../../common/models/game/igame';
import { Game } from '../../common/models/game/game';
import { IGamePersistence } from '../interfaces/persistence/igame.persistence';
import { Repository, Connection } from 'typeorm';
import { Identifiers } from '../../common/identifiers';
import { IUtilsService } from '../interfaces/service/iutils.service';

@injectable()
export class GamePersistence implements IGamePersistence {
	private repository: Repository<Game>;
	private utilsService: IUtilsService;

	constructor(
		@inject(Identifiers.UTILS_SERVICE_IDENTIFIER) $utilsService: IUtilsService,
		@inject(Identifiers.DATABASE_IDENTIFIER) $connection: Connection
	) {
		this.utilsService = $utilsService;
		this.repository = $connection.getRepository(Game);
	}

	/**
	 * @description Gets the games depending on a cursor
	 * @param  {number} limit
	 * @param  {string} cursor
	 * @return IGame[]
	 * @memberof GamePersistence
	 */
	public async getGames(limit: number, cursor: number): Promise<IGame[]> {
		const queryBuilder = this.repository.createQueryBuilder();
		if (cursor !== null) {
			queryBuilder.where(`id > ${cursor}`);
		}
		const games = await queryBuilder
			.orderBy('releaseDate', 'ASC')
			.orderBy('id', 'ASC')
			.limit(limit)
			.getMany();
		return games;
	}

	/**
	 * @description Gets a game given its id
	 * @param  {number} gameId
	 * @return Promise<IGame>
	 * @memberof GamePersistenceMock
	 */
	public async getGameById(gameId: number): Promise<IGame> {
		const query = { where: { id: gameId } };
		const foundGame = await this.repository.findOne(query);
		return foundGame;
	}

	/**
	 * @description Creates a new game
	 * @param  {IGame} data
	 * @return Promise<IGame>
	 * @memberof GamePersistence
	 */
	public async createGame(data: IGame): Promise<IGame> {
		const game = new Game();
		game.$price = data.$price;
		game.$title = data.$title;
		game.$publisherId = data.$publisherId;
		game.$releaseDate = data.$releaseDate;
		game.$tags = data.$tags;
		const savedGame = await this.repository.save(game);
		return savedGame;
	}

	/**
	 * @description Updates a game
	 * @param  {IGame} data
	 * @return Promise<IGame>
	 * @memberof GamePersistence
	 */
	public async updateGame(data: IGame): Promise<IGame> {
		const gameToUpdate = new Game();
		const id = data.$id;
		gameToUpdate.$price = data.$price;
		gameToUpdate.$publisherId = data.$publisherId;
		gameToUpdate.$title = data.$title;
		gameToUpdate.$tags = data.$tags;
		gameToUpdate.$releaseDate = data.$releaseDate;
		await this.repository.update(id, gameToUpdate);
		const updatedGame = await this.repository.findOne(id);
		return updatedGame;
	}

	/**
	 * @description Removes a game
	 * @param  {number} id
	 * @return Promise<IGame>
	 * @memberof GamePersistence
	 */
	public async removeGame(id: number): Promise<IGame> {
		const toRemove = await this.repository.findOne(id);
		const removed = await this.repository.remove(toRemove);
		return removed;
	}

	/**
	 * @description Discounts games in the upper and lower bounds
	 * @param  {number} percentage
	 * @param  {Date} lowerBound
	 * @param  {Date} upperBound
	 * @return {void}@memberof GamePersistence
	 */
	public async discountGames(percentage: number, lowerBound: Date, upperBound: Date): Promise<number> {
		const multiplicationFactor = this.utilsService.percengageToMultiplicationFactor(percentage);
		const results = await this.repository
			.createQueryBuilder()
			.update(Game)
			.set({ price: () => `price * ${multiplicationFactor}` } as any)
			.where(`releaseDate < :upperBound AND releaseDate > :lowerBound`, { upperBound, lowerBound })
			.execute();
		return results.affected;
	}

	/**
	 * @description Removes old games from the database, as specified by the lower bound
	 * @param  {Date} lowerBound
	 * @return Promise<any>
	 * @memberof GamePersistence
	 */
	public async removeOldGames(lowerBound: Date): Promise<number> {
		const results = await this.repository
			.createQueryBuilder()
			.delete()
			.where(`releaseDate < :releaseDate`, { releaseDate: lowerBound })
			.execute();
		return results.affected;
	}
}
