import { IOCContainer } from '../../../server/common/config/ioc_config';
import { Container } from 'inversify';
import { Identifiers } from '../../../server/common/identifiers';
import { IGamePersistence } from '../../../server/api/interfaces/persistence/igame.persistence';
import { GameMock } from '../../mocks/models/game/game.mock';
import { Game } from '../../../server/common/models/game/game';
import { GameFactory } from '../../utils/game-factory';

let container: Container;
let gamePersistence: IGamePersistence;
const findOne = jest.fn().mockReturnValue({});
const update = jest.fn().mockReturnValue({});
const save = jest.fn().mockReturnValue({});
const remove = jest.fn().mockReturnValue({});

describe('gamePersistence', () => {
	beforeAll(() => {
		container = IOCContainer.getInstance().$container;
		const connection = {
			getRepository: jest.fn().mockReturnValue({
				findOne,
				save,
				update,
				remove,
			}),
		};
		container.bind(Identifiers.DATABASE_IDENTIFIER).toConstantValue(connection);
	});

	beforeEach(() => {
		gamePersistence = container.get(Identifiers.GAME_PERSISTENCE_IDENTIFIER);
		jest.restoreAllMocks();
	});

	afterEach(() => {
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

	it('removeGame - Should find and remove the game', async () => {
		// @ts-ignore
		const connection = gamePersistence.repository;
		const gameId = 1;
		const mock = GameFactory.createGame(gameId);
		connection.findOne = jest.fn().mockReturnValue(mock);
		await gamePersistence.removeGame(gameId);
		expect(connection.findOne).toHaveBeenCalledWith(mock.$id);
		expect(connection.remove).toBeCalledWith(mock);
	});

	it('discountGames - Should generate the proper query', async () => {
		// @ts-ignore
		const connection = gamePersistence.repository;
		const updateSpy = jest.fn().mockReturnThis();
		const setSpy = jest.fn().mockReturnThis();
		const whereSpy = jest.fn().mockReturnThis();
		const executeSpy = jest.fn().mockReturnThis();

		connection.createQueryBuilder = jest.fn().mockReturnValue({
			update: updateSpy,
			set: setSpy,
			where: whereSpy,
			execute: executeSpy,
		});
		const percentage = 80;
		const dateStringLower = '2018-10-10 03:19:03';
		const dateStringUpper = '2019-10-10 03:19:03';
		const lowerBound = new Date(dateStringLower);
		const upperBound = new Date(dateStringUpper);
		const whereString = `releaseDate < :upperBound AND releaseDate > :lowerBound`;
		const whereMock = { lowerBound, upperBound };
		const setMock = { price: expect.any(Function) };

		await gamePersistence.discountGames(percentage, lowerBound, upperBound);
		expect(connection.createQueryBuilder).toBeCalled();
		expect(update).toBeCalled();
		expect(whereSpy).toBeCalledWith(whereString, whereMock);
		expect(setSpy).toBeCalledWith(setMock);
		expect(executeSpy).toBeCalled();
	});

	it('removeOldGames - Should generate the proper query', async () => {
		// @ts-ignore
		const connection = gamePersistence.repository;
		const deleteSpy = jest.fn().mockReturnThis();
		const whereSpy = jest.fn().mockReturnThis();
		const executeSpy = jest.fn().mockReturnThis();
		connection.createQueryBuilder = jest.fn().mockReturnValue({
			delete: deleteSpy,
			where: whereSpy,
			execute: executeSpy,
		});
		const dateStringLower = '2018-10-10 03:19:03';
		const lowerBound = new Date(dateStringLower);
		const whereString = `releaseDate < :releaseDate`;
		const whereMock = { releaseDate: lowerBound };
		await gamePersistence.removeOldGames(lowerBound);
		expect(connection.createQueryBuilder).toBeCalled();
		expect(deleteSpy).toBeCalled();
		expect(whereSpy).toBeCalledWith(whereString, whereMock);
		expect(executeSpy).toBeCalled();
	});
});
