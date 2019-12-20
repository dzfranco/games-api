import 'reflect-metadata';

import { injectable } from 'inversify';
import { IGamePersistence } from '../../../server/api/interfaces/persistence/igame.persistence';
import { IGame } from '../../../server/common/models/game/igame';
import { Game } from '../../../server/common/models/game/game';
import { Publisher } from '../../../server/common/models/publisher/publisher';
import { GameFactory } from '../../utils/game-factory';

@injectable()
export class GamePersistenceMock implements IGamePersistence {
	constructor() {}

	/**
	 * @description Creates a new game
	 * @param  {IGame} data
	 * @return Promise<IGame>
	 * @memberof GamePersistence
	 */
	public async createGame(data: IGame): Promise<IGame> {
		const game1 = new Game();
		game1.$id = 1;
		game1.$price = 39.99;
		game1.$tags = ['shooter'];
		game1.$releaseDate = new Date();
		game1.$publisher = new Publisher();
		game1.$title = 'Red Dead Redemption 2';
		return game1;
	}

	/**
	 * @description Updates a game
	 * @param  {IGame} data
	 * @return Promise<IGame>
	 * @memberof GamePersistence
	 */
	public async updateGame(data: IGame): Promise<IGame> {
		const game1 = new Game();
		game1.$id = 1;
		game1.$price = 39.99;
		game1.$tags = ['shooter'];
		game1.$releaseDate = new Date();
		game1.$publisherId = 1;
		game1.$title = 'Red Dead Redemption 2';
		return game1;
	}

	/**
	 * @description Gets a game given its id
	 * @param  {number} gameId
	 * @return Promise<IGame>
	 * @memberof GamePersistenceMock
	 */
	public async getGameById(gameId: number): Promise<IGame> {
		const game1 = new Game();
		game1.$id = 1;
		game1.$price = 39.99;
		game1.$tags = ['shooter'];
		game1.$releaseDate = new Date();
		game1.$publisherId = 1;
		game1.$title = 'Red Dead Redemption 2';
		return game1;
	}

	/**
	 * @description Gets the games depending on a cursor
	 * @param  {number} limit
	 * @param  {string} cursor
	 * @return IGame[]
	 * @memberof GamePersistence
	 */
	public async getGames(limit: number, cursor: number): Promise<IGame[]> {
		return [GameFactory.createGame(), GameFactory.createGame()];
	}

	/**
	 * @description Gets a game given its id
	 * @param  {number} gameId
	 * @return Promise<IGame>
	 * @memberof GamePersistenceMock
	 */
	public async removeGame(gameId: number): Promise<IGame> {
		const game1 = new Game();
		game1.$id = 1;
		game1.$price = 39.99;
		game1.$tags = ['shooter'];
		game1.$releaseDate = new Date();
		game1.$publisherId = 1;
		game1.$title = 'Red Dead Redemption 2';
		return game1;
	}

	/**
	 * @description Discounts games in the upper and lower bounds
	 * @param  {number} percentage
	 * @param  {Date} lowerBound
	 * @param  {Date} upperBound
	 * @return {void}@memberof GamePersistence
	 */
	public async discountGames(percentage: number, lowerBound: Date, upperBound: Date): Promise<number> {
		return 0;
	}

	/**
	 * @description Removes old games from the database, as specified by the lower bound
	 * @param  {Date} lowerBound
	 * @return Promise<any>
	 * @memberof GamePersistence
	 */
	public async removeOldGames(lowerBound: Date): Promise<number> {
		return 0;
	}
}
