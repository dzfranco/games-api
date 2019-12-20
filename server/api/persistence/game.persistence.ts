import { injectable, inject } from 'inversify';
import { IGame } from '../../common/models/game/igame';
import { Game } from '../../common/models/game/game';
import { IGamePersistence } from '../interfaces/persistence/igame.persistence';
import { Repository, Connection } from 'typeorm';
import { Identifiers } from '../../common/identifiers';

@injectable()
export class GamePersistence implements IGamePersistence {
	private repository: Repository<Game>;
	private games: IGame[];

	constructor(@inject(Identifiers.DATABASE_IDENTIFIER) $connection: Connection) {
		this.repository = $connection.getRepository(Game);
		const game1 = new Game();
		game1.$id = 1;
		game1.$price = 39.99;
		game1.$tags = ['shooter'];
		game1.$releaseDate = new Date();
		game1.$publisher = 1;
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
		const game = new Game();
		game.$price = 9.99;
		game.$title = 'Test';
		game.$publisher = 1;
		game.$releaseDate = new Date();
		game.$tags = ['testing', 'game'];
		const savedGame = await this.repository.save(game);
		return savedGame;
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
