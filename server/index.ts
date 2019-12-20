import Server from './common/server';
import { configureEnv } from './common/config/environment';

configureEnv();
const app = new Server().getServer().build();
app.listen(process.env.APP_PORT);
console.log(`Running in ${process.env.APP_PORT}`);
