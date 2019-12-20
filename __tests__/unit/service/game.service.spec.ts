import { IOCContainer } from '../../../server/common/config/ioc_config';
import { Container } from 'inversify';
import { Identifiers } from '../../../server/common/identifiers';
import { IGamePersistence } from '../../../server/api/interfaces/persistence/igame.persistence';
import { GamePersistenceMock } from '../../mocks/persistence/game.persistence';
import { IGameService } from '../../../server/api/interfaces/service/igame.service';

let container: Container;
let service: IGameService;

describe('Game Service Unit Tests', () => {
	beforeAll(() => {
		container = IOCContainer.getInstance().$container;
		container.unbind(Identifiers.GAME_PERSISTENCE_IDENTIFIER);
		container.bind<IGamePersistence>(Identifiers.GAME_PERSISTENCE_IDENTIFIER).to(GamePersistenceMock);
		service = container.get(Identifiers.GAME_SERVICE_IDENTIFIER);
	});

	it('getGames - Should return games', () => {
		const games = service.getGames('1', 1);
		expect(games.length).toBe(1);
	});
});
