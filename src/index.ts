import Config from './config';
import { connectDb } from './services/db';
import Server from './services/server';
import cluster from 'cluster';
import os from 'os';
import { argumentos } from './middlewares/auth';
import { logger } from './utils/logger';


const PORT = Config.PORT;
export const nCPU = os.cpus().length;
const clusterMode = argumentos.includes("CLUSTER"); 
console.log(clusterMode); 


connectDb().then(() => {
  console.log('DB CONECTADA');

  if(clusterMode && cluster.isMaster) {
    console.log(`NUMERO DE CPUS ===> ${nCPU}`);
    console.log(`PID MASTER ${process.pid}`);
  
    for (let i = 0; i < nCPU; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died at ${Date()}`);
      cluster.fork();
    });

  }
  else {
    const PORT = Config.PORT;
    Server.listen(PORT, () => {
      logger.info(
        `Servidor inicializado en http://localhost:${PORT} - PID WORKER ${process.pid}`,
      );
    });
    Server.on('error', error => logger.error(`Error en el servidor: ${error}`));
  }
});