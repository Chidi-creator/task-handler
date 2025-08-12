import QueueManager from "@managers/queue.manager";
import { QUEUE } from "@global/constants";
const queueManager = new QueueManager()

export const databaseQueue = queueManager.createQueue(QUEUE.DATABASE);
