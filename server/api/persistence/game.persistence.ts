import { injectable } from 'inversify';
import { IGame } from '../../common/models/game/igame';
import { Game } from '../../common/models/game/game';
import { IGamePersistence } from '../interfaces/persistence/igame.persistence';

@injectable()
export class GamePersistence implements IGamePersistence {
	private games: IGame[];
	constructor() {
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
