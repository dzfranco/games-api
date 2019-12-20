import { injectable } from 'inversify';
import { IPublisherPersistence } from '../interfaces/persistence/ipublisher.persistence';

@injectable()
export class PublisherPersistence implements IPublisherPersistence {}
