import * as express from 'express';
import * as partialResponse from 'express-partial-response';
import * as path from 'path';
import * as errorHandler from 'express-error-handler';
import { IOCContainer } from './config/ioc_config';
import { InversifyExpressServer } from 'inversify-express-utils';
import { errorHandlerMiddleware } from '../api/middleware/express-error-handling';

const responseTime = require('response-time');

/**
 * Node Express Server setup and configuration
 */
export default class Server {
	public server: InversifyExpressServer;

	constructor() {
		let root: string;

		// Setup application root
		root = process.env.NODE_ENV === 'development' ? path.normalize(__dirname + '/../..') : path.normalize('.');
		const container = IOCContainer.getInstance().$container;
		this.server = new InversifyExpressServer(container, undefined, {
			rootPath: '/api',
		});
		this.server.setConfig(app => {
			app.use((req, res, next) => {
				res.header('Access-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
				res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
				next();
			});

			// Add public folder
			app.use(express.static(`${root}/public`));

			// Add response time support
			// This will add x-response-time to the response headers
			app.use(responseTime({ suffix: false }));

			// Add partial response support
			app.use(partialResponse());

			app.use(errorHandlerMiddleware);
		});
	}

	public getServer = (): InversifyExpressServer => {
		return this.server;
	};
}
