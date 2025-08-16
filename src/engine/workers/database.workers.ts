import TaskUseCase from "@usecases/tasks.usecase";
import { JOBS, QUEUE } from "@global/constants";
import QueueManager from "@managers/queue.manager";
import { ITask } from "@models/types/tasks";
import { EmailOptions } from "@config/types/email";
import { addEmailJob } from "@engine/jobs/email.jobs";
import UserUseCase from "@usecases/users.usecase";
import { Types } from "mongoose";

const userUseCase = new UserUseCase();
const taskUseCase = new TaskUseCase();

const queueManager = new QueueManager();
export const startDatabaseWorker = async () => {
  queueManager.createWorker(QUEUE.DATABASE, async (job) => {
    try {
      if (job.name === JOBS.CHECK_DB) {
        //step one find all tasks
        console.log("Running database worker of sending reminder emails...");
        const tasks: ITask[] = await taskUseCase.findAllTasks();

        for (const task of tasks) {
         

         if (task.dueTime && task.overdue === false && task.dueTime < new Date()) {
          console.log(`Task ${task.title} is overdue, sending email...`);
          const user = await userUseCase.findUserById(task.userId);
          if(user){
           const emailOptions: EmailOptions = {
             to: user.email,
             subject: "Task Reminder",
             text: `You have a task that is overdue: ${task.title}`,
           };
           await addEmailJob(JOBS.SEND_REMINDER_EMAIL, emailOptions);
           await taskUseCase.updateTaskById(task._id as Types.ObjectId, { overdue: true });
           console.log(`Email sent and task ${task.title} marked as overdue`);
          } else {
           console.log(`User not found for task ${task.title}, skipping email`);
          }
         }
        


       
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
