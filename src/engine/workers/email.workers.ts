import QueueManager from "@managers/queue.manager";
import { EmailOptions } from "@config/types/email";
import MailService from "@service/mail.service";

const mailService = new MailService();
const queueManager = new QueueManager();

queueManager.createWorker("email", async (job) => {
  try {
    if (job.name === "sendWelcomeEmail") {
      console.log("currently running email worker");
      const data = job.data as EmailOptions;
      await mailService.sendMail(data);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email");
  }
});
