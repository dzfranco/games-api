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
import { IUtilsService } from '../../../server/api/interfaces/service/iutils.service';

let container: Container;
let utilsService: IUtilsService;

describe('Utils Service Unit Tests', () => {
	beforeEach(() => {
		container = IOCContainer.getInstance().$container;
		utilsService = container.get(Identifiers.UTILS_SERVICE_IDENTIFIER);
	});

	it('percengageToMultiplicationFactor - Should format a number between 0 and 100', () => {
		const percentage = 40;
		const formatted = utilsService.percengageToMultiplicationFactor(percentage);
		expect(formatted).toBe(0.6);
	});

	it('percengageToMultiplicationFactor - Should give 0 for a negative percentage', () => {
		const percentage = -1;
		const formatted = utilsService.percengageToMultiplicationFactor(percentage);
		expect(formatted).toBe(0);
	});

	it('percengageToMultiplicationFactor - Should accept more than 100 percent', () => {
		const percentage = 110;
		const formatted = utilsService.percengageToMultiplicationFactor(percentage);
		expect(formatted).toBe(1.1);
	});

	it('formatMySQLDate - Should format a date in the proper format', () => {
		const dateString = '2018-10-10 03:19:03';
		const date = new Date(dateString);
		const formatted = utilsService.formatMySQLDate(date);
		expect(formatted).toBe(dateString);
	});
});
