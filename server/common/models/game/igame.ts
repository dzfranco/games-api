import { IPublisher } from '../publisher/ipublisher';
export interface IGame {
	$id: number;
	$title: string;
	$price: number;
	$publisherId: number;
	$tags: string[];
	$releaseDate: Date;
}
