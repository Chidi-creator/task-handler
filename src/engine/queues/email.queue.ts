import QueueManager from "@managers/queue.manager";
import { WORKERS } from "@global/constants";
const queueManager = new QueueManager();

export const emailQueue = queueManager.createQueue(WORKERS.EMAIL);
