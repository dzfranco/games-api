import { IGame } from './igame';
import { IPublisher } from '../publisher/ipublisher';

export class GameDTO implements IGame {
	private id: number;
	private title: string;
	private price: number;
	private publisherId: number;
	private tags: string[];
	private releaseDate: Date;

	/**
	 * Getter $id
	 * @return {number}
	 */
	public get $id(): number {
		return this.id;
	}

	/**
	 * Getter $title
	 * @return {string}
	 */
	public get $title(): string {
		return this.title;
	}

	/**
	 * Getter $price
	 * @return {number}
	 */
	public get $price(): number {
		return this.price;
	}

	/**
	 * Getter $publisher
	 * @return {number}
	 */
	public get $publisherId(): number {
		return this.publisherId;
	}

	/**
	 * Getter $tags
	 * @return {string[]}
	 */
	public get $tags(): string[] {
		return this.tags;
	}

	/**
	 * Getter $releaseDate
	 * @return {Date}
	 */
	public get $releaseDate(): Date {
		return this.releaseDate;
	}

	/**
	 * Setter $id
	 * @param {number} value
	 */
	public set $id(value: number) {
		this.id = value;
	}

	/**
	 * Setter $title
	 * @param {string} value
	 */
	public set $title(value: string) {
		this.title = value;
	}

	/**
	 * Setter $price
	 * @param {number} value
	 */
	public set $price(value: number) {
		this.price = value;
	}

	/**
	 * Setter $publisher
	 * @param {number} value
	 */
	public set $publisherId(value: number) {
		this.publisherId = value;
	}

	/**
	 * Setter $tags
	 * @param {string[]} value
	 */
	public set $tags(value: string[]) {
		this.tags = value;
	}

	/**
	 * Setter $releaseDate
	 * @param {Date} value
	 */
	public set $releaseDate(value: Date) {
		this.releaseDate = value;
	}
}
