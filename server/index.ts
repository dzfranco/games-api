import Server from './common/server';
import { configureEnv } from './common/config/environment';
import { IOCContainer } from './common/config/ioc_config';
import { DatabaseConnection } from './common/config/database';
import { ENVIRONMENTS } from './common/constants/environments';

configureEnv();

const connectDatabase = async () => {
	await IOCContainer.getInstance().$container.loadAsync(DatabaseConnection);
};

const buildServer = async () => {
	const app = new Server().getServer().build();
	app.listen(process.env.APP_PORT);
	console.log(`Running in ${process.env.APP_PORT}`);
};

const setup = async () => {
	if (process.env.NODE_ENV !== ENVIRONMENTS.TEST) {
		await connectDatabase();
	}
	await buildServer();
};

setup();
