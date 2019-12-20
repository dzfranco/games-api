import { injectable, inject } from 'inversify';
import { IGameService } from '../interfaces/service/igame.service';
import { IGame } from '../../common/models/game/igame';
import { IGamePersistence } from '../interfaces/persistence/igame.persistence';
import { Identifiers } from '../../common/identifiers';
import { InternalServerError } from 'restify-errors';

@injectable()
export class GameService implements IGameService {
	private gamePersistence: IGamePersistence;

	constructor(@inject(Identifiers.GAME_PERSISTENCE_IDENTIFIER) $gamePersistence: IGamePersistence) {
		this.gamePersistence = $gamePersistence;
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
	 * @return IGame[]
	 * @memberof GameService
	 */
	public getGames(cursor: string, limit: number): IGame[] {
		try {
			const games = this.gamePersistence.getGames('1', 1);
			return games;
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
