import 'reflect-metadata';

import { injectable } from 'inversify';
import { IGamePersistence } from '../../../server/api/interfaces/persistence/igame.persistence';
import { IGame } from '../../../server/common/models/game/igame';
import { Game } from '../../../server/common/models/game/game';
import { Publisher } from '../../../server/common/models/publisher/publisher';

@injectable()
export class GamePersistenceMock implements IGamePersistence {
	private games: IGame[];
	constructor() {
		const game1 = new Game();
		game1.$id = 1;
		game1.$price = 39.99;
		game1.$tags = ['shooter'];
		game1.$releaseDate = new Date();
		game1.$publisher = new Publisher();
		game1.$title = 'Red Dead Redemption 2';
		this.games = [game1];
	}

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
	 * @param  {string} cursor
	 * @param  {number} limit
	 * @return IGame[]
	 * @memberof GamePersistence
	 */
	public getGames(cursor: string, limit: number): IGame[] {
		const cursorIndex = this.games.findIndex(game => game.$id.toString() === cursor);
		if (cursorIndex >= 0) {
			return this.games.slice(cursorIndex, limit);
		}
		return this.games.slice(0, limit);
	}
}
