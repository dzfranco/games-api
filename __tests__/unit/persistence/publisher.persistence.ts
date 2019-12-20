import { injectable } from 'inversify';
import { IPublisherPersistence } from '../../../server/api/interfaces/persistence/ipublisher.persistence';
import { Publisher } from '../../../server/common/models/publisher/publisher';
import { IGame } from '../../../server/common/models/game/igame';

@injectable()
export class PublisherPersistenceMock implements IPublisherPersistence {
	/**
	 * @description Gets a game publisher
	 * @param  {IGame} game
	 * @return
	 * @memberof PublisherPersistence
	 */
	public async getGamePublisher(game: IGame): Promise<Publisher> {
		const publisher = new Publisher();
		publisher.$name = 'Test';
		publisher.$id = 1;
		publisher.$phone = '12332199';
		publisher.$siret = 42890389403098;
		return publisher;
	}
}
