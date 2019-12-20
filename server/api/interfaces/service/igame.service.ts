import { IGame } from '../../../common/models/game/igame';

export interface IGameService {
	/**
	 * @description Gets the games from the database. This method should handle business logic.
	 * @return IGame[]
	 * @memberof GameService
	 */
	getGames(cursor: string, limit: number): IGame[];
}
