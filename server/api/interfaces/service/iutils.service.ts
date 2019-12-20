export interface IUtilsService {
	/**
	 * @description Converts a percentage to a multiplication factor
	 * @param  {number} percentage
	 * @return
	 * @memberof UtilsService
	 */
	percengageToMultiplicationFactor(percentage: number);
	/**
	 *
	 * @param  {Date} date
	 * @return string
	 * @memberof UtilsService
	 */
	formatMySQLDate(date: Date): string;
}
