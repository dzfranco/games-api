import { IGame } from './igame';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Publisher } from '../publisher/publisher';

@Entity('game')
export class Game implements IGame {
	@PrimaryGeneratedColumn()
	private id: number;
	@Column({ length: 150 })
	private title: string;
	@Column('double')
	private price: number;
	@Column()
	private publisherId: number;

	@ManyToOne(
		() => Publisher,
		publisher => publisher.$id
	)
	private publisher: Publisher;

	@Column('simple-array')
	private tags: string[];
	@Column()
	private releaseDate: Date;

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
	 * @return {Publisher}
	 */
	public get $publisher(): Publisher {
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
	 * @param {Publisher} value
	 */
	public set $publisher(value: Publisher) {
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
