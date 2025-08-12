import QueueManager from "@managers/queue.manager";

const queueManager = new QueueManager();

export const emailQueue = queueManager.createQueue("email");
