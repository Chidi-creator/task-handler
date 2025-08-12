import { EmailOptions } from "@config/types/email";
import { emailQueue } from "../queues/email.queue";
import { ProviderError } from "@managers/error.manager";

export const addEmailJob = async(data:EmailOptions) => {
    try { 
        const queue = await emailQueue;
        await queue.add("sendWelcomeEmail", data, {
            attempts: 3,
            removeOnComplete: 10, 
            removeOnFail: 5       
        });
    } catch (error) {
        console.log(error)
        throw new ProviderError("Failed to add email job to queue");
    }
}