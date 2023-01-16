import { server } from './server/server';
import cluster from 'cluster';
import { cpus } from 'os';
import 'dotenv/config';

const PORT = process.env.PORT_SERVER;

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  server().listen(PORT, () => console.log(`Server running on port ${PORT}`));
  console.log(cluster.worker?.id, 'worker');
  console.log(`Worker ${process.pid} started`);
}
