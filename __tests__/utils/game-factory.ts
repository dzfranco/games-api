import * as faker from 'faker';
import { Game } from '../../server/common/models/game/game';
import { GameMock } from '../mocks/models/game/game.mock';

export class GameFactory {
	public static createGameMock(id?: number): GameMock {
		const game = new GameMock();
		game.$id = id ? id : faker.random.number(10);
		game.$price = faker.random.number(2);
		game.$releaseDate = faker.date.past(0);
		game.$title = faker.lorem.word();
		game.$publisherId = faker.random.number(10);
		game.$tags = [faker.lorem.word(), faker.lorem.word()];
		return game;
	}

	public static createGame(id?: number): Game {
		const game = new Game();
		game.$id = id ? id : faker.random.number(10);
		game.$price = faker.random.number(2);
		game.$releaseDate = faker.date.past(0);
		game.$title = faker.lorem.word();
		game.$publisherId = faker.random.number(10);
		game.$tags = [faker.lorem.word(), faker.lorem.word()];
		return game;
	}
}
