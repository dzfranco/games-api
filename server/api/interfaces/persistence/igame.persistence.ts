import { IGame } from '../../../common/models/game/igame';

export interface IGamePersistence {
	/**
	 * @description Gets the games depending on a cursor
	 * @param  {number} limit
	 * @param  {string} cursor
	 * @return IGame[]
	 * @memberof GamePersistence
	 */
	getGames(limit: number, cursor: number): Promise<IGame[]>;

	/**
	 * @description Gets a game given its id
	 * @param  {number} gameId
	 * @return Promise<IGame>
	 * @memberof GamePersistenceMock
	 */
	getGameById(gameId: number): Promise<IGame>;

	/**
	 * @description Creates a new game
	 * @param  {IGame} data
	 * @return Promise<IGame>
	 * @memberof GamePersistence
	 */
	createGame(data: IGame): Promise<IGame>;

	/**
	 * @description Updates a game
	 * @param  {IGame} data
	 * @return Promise<IGame>
	 * @memberof GamePersistence
	 */
	updateGame(data: IGame): Promise<IGame>;

	/**
	 * @description Removes a game
	 * @param  {number} id
	 * @return Promise<IGame>
	 * @memberof GamePersistence
	 */
	removeGame(id: number): Promise<IGame>;

	/**
	 * @description Discounts games in the upper and lower bounds
	 * @param  {number} percentage
	 * @param  {Date} lowerBound
	 * @param  {Date} upperBound
	 * @return {void}@memberof GamePersistence
	 */
	discountGames(percentage: number, lowerBound: Date, upperBound: Date): Promise<number>;

	/**
	 * @description Removes old games from the database, as specified by the lower bound
	 * @param  {Date} lowerBound
	 * @return Promise<any>
	 * @memberof GamePersistence
	 */
	removeOldGames(lowerBound: Date): Promise<number>;
}
