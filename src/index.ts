import { server } from './server/server';
import 'dotenv/config';

const PORT = process.env.PORT_SERVER;

server().listen(PORT, () => console.log(`Server running on port ${PORT}`));
