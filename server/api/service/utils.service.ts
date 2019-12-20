import { injectable } from 'inversify';
import { format } from 'date-fns';
import { IUtilsService } from '../interfaces/service/iutils.service';

@injectable()
export class UtilsService implements IUtilsService {
	private readonly MYSQL_DATE_FORMAT = 'yyyy-MM-dd hh:mm:ss';
	private readonly MAX_PERCENTAGE = 100;

	/**
	 * @description Converts a percentage to a multiplication factor
	 * @param  {number} percentage
	 * @return
	 * @memberof UtilsService
	 */
	public percengageToMultiplicationFactor(percentage: number) {
		if (percentage < 0) {
			return 0;
		}
		if (percentage > this.MAX_PERCENTAGE) {
			return percentage / this.MAX_PERCENTAGE;
		}
		return (this.MAX_PERCENTAGE - percentage) / this.MAX_PERCENTAGE;
	}

	/**
	 * @description Formats a date to a format that MySQL can understand
	 * @param  {Date} date
	 * @return string
	 * @memberof UtilsService
	 */
	public formatMySQLDate(date: Date): string {
		const newDate = format(date, this.MYSQL_DATE_FORMAT);
		return newDate;
	}
}
