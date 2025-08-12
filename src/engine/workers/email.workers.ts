import QueueManager from "@managers/queue.manager";
import { EmailOptions } from "@config/types/email";
import MailService from "@service/mail.service";
import { JOBS, QUEUE } from "@global/constants";

const mailService = new MailService();
const queueManager = new QueueManager();

export const startEmailWorker = async () => {
  try {
    await queueManager.createWorker(QUEUE.EMAIL, async (job) => {
      try {
        if (job.name === JOBS.SEND_WELCOME_EMAIL) {
          console.log(`Currently running ${job.name} worker`);

          const data = job.data as EmailOptions;
          await mailService.sendMail(data);

          console.log(
            `Job ${job.id}: ${job.name} completed successfully at ${new Date().toISOString()}`
          );
        }
      } catch (error) {
        console.error(
          `Job ${job.id}: ${job.name} failed at ${new Date().toISOString()} with error:`,
          error
        );
        throw new Error(`Failed to send ${job.name} email`);
      }
    });
  } catch (error) {
    console.error("Failed to start email worker:", error);
    throw error; // rethrow so the caller knows the worker failed to start
  }
};
