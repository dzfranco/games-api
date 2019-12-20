import { DefinedHttpError, NotFoundError } from 'restify-errors';
import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (err, req: Request, res: Response, next: NextFunction) => {
	res.status(err.statusCode).send(err.body);
	return next();
};
