import cluster from 'cluster';
import { cpus } from 'os';

const numCPUs = cpus().length;

async function sleep(millis: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

const range = (n: number) => Array.from(Array(n).keys());

async function main(): Promise<void> {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    const todo = range(20);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      if (todo.length > 0) {
        const a = todo.pop();
        cluster.fork({
          WORKUNIT: a,
        });
      }
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      if (todo.length > 0) {
        const a = todo.pop();
        cluster.fork({
          WORKUNIT: a,
        });
      }
    });

    while (Object.keys(cluster.workers).length > 0) {
      await sleep(100);
      // console.log('waiting...');
    }
  } else {
    console.log(`Worker ${process.pid} started ${process.env.WORKUNIT}`);
    await sleep(5000);
    console.log(`Worker ${process.pid} done`);
  }
}

main()
  .then(() => {
    console.log('DONE');
    process.exit();
  })
  .catch((reason) => {
    console.error('ERROR', reason);
    process.exit(1);
  });
