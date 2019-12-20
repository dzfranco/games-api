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
	 * @return IGame[]
	 * @memberof GameService
	 */
	getGames(cursor: string, limit: number): IGame[];

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
}
