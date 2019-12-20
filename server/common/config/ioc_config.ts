import 'reflect-metadata';
import { Container } from 'inversify';

import '../../api/controllers/game/controller';
import { IGamePersistence } from '../../api/interfaces/persistence/igame.persistence';
import { Identifiers } from '../identifiers';
import { GamePersistence } from '../../api/persistence/game.persistence';
import { IGameService } from '../../api/interfaces/service/igame.service';
import { GameService } from '../../api/service/game.service';
import { IPublisherPersistence } from '../../api/interfaces/persistence/ipublisher.persistence';
import { PublisherPersistence } from '../../api/persistence/publisher.persistence';

/**
 * @description Inversion of Control Container
 *
 * This will be a signleton that sets up Inversify's container bindings
 */
export class IOCContainer {
	public static getInstance() {
		if (!IOCContainer.instance) {
			IOCContainer.instance = new IOCContainer();
			const container = new Container();

			// Inject persistence
			container.bind<IGamePersistence>(Identifiers.GAME_PERSISTENCE_IDENTIFIER).to(GamePersistence);
			container
				.bind<IPublisherPersistence>(Identifiers.PUBLISHER_PERSISTENCE_IDENTIFIER)
				.to(PublisherPersistence);

			// Inject Service
			container
				.bind<IGameService>(Identifiers.GAME_SERVICE_IDENTIFIER)
				.to(GameService)
				.inSingletonScope();

			IOCContainer.instance.container = container;
		}

		return IOCContainer.instance;
	}

	private static instance: IOCContainer;
	private container: Container;

	public get $container(): Container {
		return this.container;
	}

	public set $container(container: Container) {
		this.container = container;
	}
}
