import { databaseQueue } from "@engine/queues/database.queue";
import { JOBS, QUEUE } from "@global/constants";
import QueueManager from "@managers/queue.manager";

const queueManager = new QueueManager();

export async function scheduleDatabaseJob() {
  await queueManager.scheduleJob(
    await databaseQueue,
    JOBS.CHECK_DB,
    {},
    '* * * * *'
  );
}
