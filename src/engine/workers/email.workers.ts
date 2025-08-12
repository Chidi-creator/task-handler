import QueueManager from "@managers/queue.manager";
import { EmailOptions } from "@config/types/email";
import MailService from "@service/mail.service";
import { JOBS, WORKERS } from "@global/constants";

const mailService = new MailService();
const queueManager = new QueueManager();

queueManager.createWorker(WORKERS.EMAIL, async (job) => {
  try {
    if (job.name === JOBS.SEND_WELCOME_EMAIL) {
      console.log(`currently running ${job.name} worker`);
      const data = job.data as EmailOptions;
      await mailService.sendMail(data);

      console.log(
        `Job ${job.id}: ${
          job.name
        } completed successfully at ${new Date().toISOString()}`
      );
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
