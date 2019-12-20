import { ValidationSchema } from 'express-validator';

export const GameListValidation: ValidationSchema = {
	limit: {
		in: ['query'],
		isInt: {
			options: { min: 5, max: 20 },
		},
		errorMessage: 'Limit must be a number between 5 and 20',
		toInt: true,
		optional: {
			options: {
				nullable: false,
			},
		},
	},
	cursor: {
		in: ['query'],
		isInt: true,
	},
};
