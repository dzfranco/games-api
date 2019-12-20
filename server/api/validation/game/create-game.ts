import { IsNumber, IsPositive, IsInt, IsArray, IsString, IsDateString, MaxLength } from 'class-validator';
import { IGame } from '../../../common/models/game/igame';

export class CreateGameValidation implements Partial<IGame> {
	@IsString()
	@MaxLength(120)
	private title: string;
	@IsNumber()
	@IsPositive()
	private price: number;
	@IsNumber()
	@IsInt()
	private publisherId: number;
	@IsString({ each: true })
	@IsArray()
	private tags: string[];
	@IsDateString()
	private date: Date;

	/**
	 * Getter $title
	 * @return {string}
	 */
	public get $title(): string {
		return this.title;
	}

	/**
	 * Setter $title
	 * @param {string} value
	 */
	public set $title(value: string) {
		this.title = value;
	}

	/**
	 * Getter $price
	 * @return {number}
	 */
	public get $price(): number {
		return this.price;
	}

	/**
	 * Setter $price
	 * @param {number} value
	 */
	public set $price(value: number) {
		this.price = value;
	}

	/**
	 * Getter $publisherId
	 * @return {number}
	 */
	public get $publisherId(): number {
		return this.publisherId;
	}

	/**
	 * Setter $publisherId
	 * @param {number} value
	 */
	public set $publisherId(value: number) {
		this.publisherId = value;
	}

	/**
	 * Getter $tags
	 * @return {string[]}
	 */
	public get $tags(): string[] {
		return this.tags;
	}

	/**
	 * Setter $tags
	 * @param {string[]} value
	 */
	public set $tags(value: string[]) {
		this.tags = value;
	}

	/**
	 * Getter $date
	 * @return {Date}
	 */
	public get $date(): Date {
		return this.date;
	}

	/**
	 * Setter $date
	 * @param {Date} value
	 */
	public set $date(value: Date) {
		this.date = value;
	}
}
