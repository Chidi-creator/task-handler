import { startDatabaseWorker } from "./workers/database.workers";
import { startEmailWorker } from "./workers/email.workers";
const setUpWorkers = async () => {
  console.log("Setting up workers...");

  await startEmailWorker();
  await startDatabaseWorker();
};

export default setUpWorkers;
