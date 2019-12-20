import { injectable, inject } from 'inversify';
import { IPublisherPersistence } from '../interfaces/persistence/ipublisher.persistence';
import { Publisher } from '../../common/models/publisher/publisher';
import { Repository, Connection } from 'typeorm';
import { Identifiers } from '../../common/identifiers';
import { IGame } from '../../common/models/game/igame';

@injectable()
export class PublisherPersistence implements IPublisherPersistence {
	private repository: Repository<Publisher>;

	constructor(@inject(Identifiers.DATABASE_IDENTIFIER) $connection: Connection) {
		this.repository = $connection.getRepository(Publisher);
	}

	/**
	 * @description Gets a game publisher
	 * @param  {IGame} game
	 * @return
	 * @memberof PublisherPersistence
	 */
	public async getGamePublisher(game: IGame): Promise<Publisher> {
		const query = { where: { id: game.$publisherId } };
		const foundPublisher = await this.repository.findOne(query);
		return foundPublisher;
	}
}
