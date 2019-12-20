export class DiscountDTO {
	private discounted: number;
	private deleted: number;

	/**
	 * Getter $discounted
	 * @return {number}
	 */
	public get $discounted(): number {
		return this.discounted;
	}

	/**
	 * Setter $discounted
	 * @param {number} value
	 */
	public set $discounted(value: number) {
		this.discounted = value;
	}

	/**
	 * Getter $deleted
	 * @return {number}
	 */
	public get $deleted(): number {
		return this.deleted;
	}

	/**
	 * Setter $deleted
	 * @param {number} value
	 */
	public set $deleted(value: number) {
		this.deleted = value;
	}
}
