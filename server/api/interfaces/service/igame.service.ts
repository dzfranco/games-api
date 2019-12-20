import { IGame } from '../../../common/models/game/igame';

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
}
