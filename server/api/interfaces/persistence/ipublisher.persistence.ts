import { Publisher } from '../../../common/models/publisher/publisher';
import { IGame } from '../../../common/models/game/igame';

export interface IPublisherPersistence {
	/**
	 * @description Gets a game publisher
	 * @param  {IGame} game
	 * @return
	 * @memberof PublisherPersistence
	 */
	getGamePublisher(game: IGame): Promise<Publisher>;
}
