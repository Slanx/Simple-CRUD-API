import { server } from './server/server';
import 'dotenv/config';

const PORT = process.env.PORT_SERVER;

server(PORT!);
