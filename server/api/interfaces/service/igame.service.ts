import { IGame } from '../../../common/models/game/igame';
import { IPublisher } from '../../../common/models/publisher/ipublisher';

export interface IGameService {
	/**
	 * @description
	 * @param  {IGame} gameData
	 * @return Promise<IGame>
	 * @memberof GameService
	 */
	saveGame(gameData: IGame): Promise<IGame>;

	/**
	 * @description Gets the games from the database. This method should handle business logic.
	 * @return Promise<IGame[]>
	 * @memberof GameService
	 */
	getGames(limit: number, cursor: number): Promise<IGame[]>;

	/**
	 * @description Gets a game publisher given the game ID
	 * @param  {number} gameId
	 * @return IPublisher
	 * @memberof GameService
	 */
	getGamePublisher(gameId: number): Promise<IPublisher>;

	/**
	 * @description Updates a game
	 * @param  {IGame} gameData
	 * @return Promise<IGame>
	 * @memberof GameService
	 */
	updateGame(gameData: IGame): Promise<IGame>;

	/**
	 * @description Removes a game
	 * @param  {number} gameId
	 * @return Promise<IGame>
	 * @memberof GameService
	 */
	removeGame(gameId: number): Promise<IGame>;

	/**
	 * @description Discounts old games
	 * @return Promise<number>
	 * @memberof GameService
	 */
	discountGames(): Promise<number>;

	/**
	 * @description Removes old games
	 * @return Promise<number>
	 * @memberof GameService
	 */
	removeOldGames(): Promise<number>;
}
