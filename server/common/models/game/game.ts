import { IGame } from './igame';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('game')
export class Game implements IGame {
	@PrimaryGeneratedColumn()
	private id: number;
	@Column({ length: 150 })
	private title: string;
	@Column('double')
	private price: number;

	private publisher: number;
	@Column('simple-array')
	private tags: string[];
	@Column()
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
	 * @return {string}
	 */
	public get $publisher(): number {
		return this.publisher;
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
	 * @param {string} value
	 */
	public set $publisher(value: number) {
		this.publisher = value;
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
