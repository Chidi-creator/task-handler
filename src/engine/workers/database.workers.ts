import TaskUseCase from "@usecases/tasks.usecase";
import { JOBS, QUEUE } from "@global/constants";
import { databaseQueue } from "@engine/queues/database.queue";
import QueueManager from "@managers/queue.manager";
import { IUser } from "@models/types/user";
import { ITask } from "@models/types/tasks";
import { connDb } from "database/mongo";

const taskUseCase = new TaskUseCase();

const queueManager = new QueueManager();
export const startDatabaseWorker = async () => {
  queueManager.createWorker(QUEUE.DATABASE, async (job) => {
    try {
      await connDb();
      if (job.name === JOBS.CHECK_DB) {
        console.log("Running database worker of and Checking database...");

        const tasks: ITask[] = await taskUseCase.findAllTasks();

        for (const task of tasks) {
          console.log(task.userId);
        }
      }
    } catch (error) {
      console.log(
        `Job ${job.id}: ${
          job.name
        } failed at ${new Date().toISOString()} with error: ${error}`
      );

      throw new Error(`Failed to send ${job.name} email`);
    }
  });
};
