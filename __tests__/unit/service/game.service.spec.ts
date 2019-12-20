import { IOCContainer } from '../../../server/common/config/ioc_config';
import { Container } from 'inversify';
import { Identifiers } from '../../../server/common/identifiers';
import { IGamePersistence } from '../../../server/api/interfaces/persistence/igame.persistence';
import { GamePersistenceMock } from '../../mocks/persistence/game.persistence';
import { IGameService } from '../../../server/api/interfaces/service/igame.service';
import { GameMock } from '../../mocks/models/game/game.mock';
import { GameService } from '../../../server/api/service/game.service';
import { IGame } from '../../../server/common/models/game/igame';
import { InternalServerError, NotFoundError } from 'restify-errors';
import { IPublisherPersistence } from '../../../server/api/interfaces/persistence/ipublisher.persistence';
import { PublisherPersistenceMock } from '../../mocks/persistence/publisher.persistence';

let container: Container;
let service: IGameService;
let persistence: IGamePersistence;
let publisherPersistence: IPublisherPersistence;

describe('Game Service Unit Tests', () => {
	beforeEach(() => {
		container = IOCContainer.getInstance().$container;
		container.unbind(Identifiers.PUBLISHER_PERSISTENCE_IDENTIFIER);
		container.unbind(Identifiers.GAME_PERSISTENCE_IDENTIFIER);
		container.bind<IGamePersistence>(Identifiers.GAME_PERSISTENCE_IDENTIFIER).to(GamePersistenceMock);
		container
			.bind<IPublisherPersistence>(Identifiers.PUBLISHER_PERSISTENCE_IDENTIFIER)
			.to(PublisherPersistenceMock);
		persistence = container.get(Identifiers.GAME_PERSISTENCE_IDENTIFIER);
		publisherPersistence = container.get(Identifiers.PUBLISHER_PERSISTENCE_IDENTIFIER);
	});

	it('getGames - Should return games', async () => {
		service = container.get(Identifiers.GAME_SERVICE_IDENTIFIER);
		const games = await service.getGames(1, 1);
		expect(games).toBeDefined();
	});

	it('saveGame - Gracefully handles error', async () => {
		const spy = jest.spyOn(persistence, 'createGame').mockImplementation(async (data: IGame) => {
			throw new Error('Error');
		});
		container.unbind(Identifiers.GAME_PERSISTENCE_IDENTIFIER);
		container.unbind(Identifiers.GAME_SERVICE_IDENTIFIER);
		container.bind<IGamePersistence>(Identifiers.GAME_PERSISTENCE_IDENTIFIER).toConstantValue(persistence);
		container.bind<IGameService>(Identifiers.GAME_SERVICE_IDENTIFIER).to(GameService);
		service = container.get(Identifiers.GAME_SERVICE_IDENTIFIER);
		const mock = new GameMock();
		mock.$id = 1;
		mock.$price = 9.99;
		mock.$releaseDate = new Date('2019-12-20T03:19:03.174Z');
		mock.$tags = ['fighting'];
		mock.$publisherId = 1;
		mock.$title = 'Street fighter';
		await expect(service.saveGame(mock)).rejects.toBeInstanceOf(InternalServerError);
		expect(spy).toHaveBeenCalled();
	});

	it('getGamePublisher - Gets a publisher', async () => {
		const game = await service.getGamePublisher(1);
		expect(game).toMatchObject({
			name: 'Test',
			id: 1,
			phone: '12332199',
			siret: 42890389403098,
		});
	});

	it('getGamePublisher - Should throw an error if game not found', async () => {
		const spy = jest.spyOn(persistence, 'getGameById').mockImplementation(async () => undefined);
		container.unbind(Identifiers.GAME_PERSISTENCE_IDENTIFIER);
		container.unbind(Identifiers.GAME_SERVICE_IDENTIFIER);
		container.bind<IGamePersistence>(Identifiers.GAME_PERSISTENCE_IDENTIFIER).toConstantValue(persistence);
		container.bind<IGameService>(Identifiers.GAME_SERVICE_IDENTIFIER).to(GameService);
		service = container.get(Identifiers.GAME_SERVICE_IDENTIFIER);
		const gameId = 1;
		await expect(service.getGamePublisher(gameId)).rejects.toBeInstanceOf(NotFoundError);
		expect(spy).toHaveBeenCalled();
	});

	it('getGamePublisher - Should throw an error if publisher is not found', async () => {
		const spy = jest
			.spyOn(publisherPersistence, 'getGamePublisher')
			.mockImplementation(async (game: IGame) => undefined);
		container.unbind(Identifiers.PUBLISHER_PERSISTENCE_IDENTIFIER);
		container
			.bind<IPublisherPersistence>(Identifiers.PUBLISHER_PERSISTENCE_IDENTIFIER)
			.toConstantValue(publisherPersistence);
		container.unbind(Identifiers.GAME_SERVICE_IDENTIFIER);
		container.bind<IGameService>(Identifiers.GAME_SERVICE_IDENTIFIER).to(GameService);
		service = container.get(Identifiers.GAME_SERVICE_IDENTIFIER);
		const gameId = 1;
		await expect(service.getGamePublisher(gameId)).rejects.toBeInstanceOf(NotFoundError);
		expect(spy).toHaveBeenCalled();
	});
});
