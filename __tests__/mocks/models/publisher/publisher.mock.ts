import { IPublisher } from '../../../../server/common/models/publisher/ipublisher';

export class PublisherMock implements IPublisher {
	private id: number;
	private name: string;
	private siret: number;
	private phone: string;

	/**
	 * Getter $id
	 * @return {number}
	 */
	public get $id(): number {
		return this.id;
	}

	/**
	 * Getter $name
	 * @return {string}
	 */
	public get $name(): string {
		return this.name;
	}

	/**
	 * Getter $siret
	 * @return {number}
	 */
	public get $siret(): number {
		return this.siret;
	}

	/**
	 * Getter $phone
	 * @return {string}
	 */
	public get $phone(): string {
		return this.phone;
	}

	/**
	 * Setter $id
	 * @param {number} value
	 */
	public set $id(value: number) {
		this.id = value;
	}

	/**
	 * Setter $name
	 * @param {string} value
	 */
	public set $name(value: string) {
		this.name = value;
	}

	/**
	 * Setter $siret
	 * @param {number} value
	 */
	public set $siret(value: number) {
		this.siret = value;
	}

	/**
	 * Setter $phone
	 * @param {string} value
	 */
	public set $phone(value: string) {
		this.phone = value;
	}
}
