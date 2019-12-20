import { IGame } from '../../../common/models/game/igame';

export interface IGamePersistence {
	/**
	 * @description Gets the games depending on a cursor. This method should interface with the Database and return an object
	 * @param  {string} cursor
	 * @param  {number} limit
	 * @return IGame[]
	 * @memberof GamePersistence
	 */
	getGames(cursor: string, limit: number): IGame[];

	/**
	 * @description Creates a new game
	 * @param  {IGame} data
	 * @return Promise<IGame>
	 * @memberof GamePersistence
	 */
	createGame(data: IGame): Promise<IGame>;
}
