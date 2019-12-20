import { interfaces, AsyncContainerModule } from 'inversify';
import { createConnection, Connection } from 'typeorm';
import { Identifiers } from '../identifiers';
import { Game } from '../models/game/game';

export const DatabaseConnection = new AsyncContainerModule(async (bind: interfaces.Bind) => {
	try {
		const connection = await createConnection({
			type: 'mysql',
			username: process.env.MYSQL_USERNAME,
			host: process.env.MYSQL_HOST,
			port: Number.parseInt(process.env.MYSQL_PORT, 10),
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
			entities: [Game],
		});
		console.log('Connected to MYSQL');
		bind<Connection>(Identifiers.DATABASE_IDENTIFIER).toConstantValue(connection);
	} catch (error) {
		console.error(error);
		throw error;
	}
});
