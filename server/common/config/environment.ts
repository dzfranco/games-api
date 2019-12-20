import { config } from 'dotenv';

export const configureEnv = () => {
	console.log(`Configuring environment: ${process.env.NODE_ENV}`);
	config({ path: `.${process.env.NODE_ENV}.env` });
};
