import { IOCContainer } from '../../../server/common/config/ioc_config';
import { Container } from 'inversify';
import { Identifiers } from '../../../server/common/identifiers';
import { IGamePersistence } from '../../../server/api/interfaces/persistence/igame.persistence';
import { GameMock } from '../../mocks/models/game/game.mock';
import { Game } from '../../../server/common/models/game/game';

let container: Container;
let gamePersistence: IGamePersistence;
const findOne = jest.fn().mockReturnValue({});
const update = jest.fn().mockReturnValue({});
const save = jest.fn().mockReturnValue({});

describe('gamePersistence', () => {
	beforeAll(() => {
		container = IOCContainer.getInstance().$container;
		const connection = {
			getRepository: jest.fn().mockReturnValue({
				findOne,
				save,
				update,
			}),
		};
		container.bind(Identifiers.DATABASE_IDENTIFIER).toConstantValue(connection);
	});

	beforeEach(() => {
		gamePersistence = container.get(Identifiers.GAME_PERSISTENCE_IDENTIFIER);
		jest.restoreAllMocks();
	});

	it('createGame - Should call the function with the proper values', async () => {
		// @ts-ignore
		const connection = gamePersistence.repository;
		const game = new GameMock();
		game.$price = 1;
		game.$publisherId = 2;
		game.$releaseDate = new Date();
		game.$title = 'Title';
		game.$tags = ['Tags'];
		await gamePersistence.createGame(game);
		expect(connection.save).toHaveBeenNthCalledWith(1, game);
	});

	it('getGameById - Should try to find the proper query', async () => {
		// @ts-ignore
		const connection = gamePersistence.repository;
		const gameId = 1;
		const query = { where: { id: gameId } };
		await gamePersistence.getGameById(gameId);
		expect(connection.findOne).toHaveBeenNthCalledWith(1, query);
	});

	it('updateGame - Should update with the proper params', async () => {
		// @ts-ignore
		const connection = gamePersistence.repository;
		const mock = new GameMock();
		mock.$id = 1;
		mock.$price = 1;
		mock.$publisherId = 2;
		mock.$releaseDate = new Date('2019-12-20T06:52:02.611Z');
		mock.$title = 'Title';
		mock.$tags = ['Tags'];
		await gamePersistence.updateGame(mock);
		const game = new Game();
		game.$price = 1;
		game.$publisherId = 2;
		game.$releaseDate = new Date('2019-12-20T06:52:02.611Z');
		game.$title = 'Title';
		game.$tags = ['Tags'];
		expect(connection.update).toHaveBeenCalledWith(mock.$id, game);
		expect(connection.findOne).toBeCalledWith(mock.$id);
	});
});
