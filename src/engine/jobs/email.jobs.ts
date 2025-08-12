import { EmailOptions } from "@config/types/email";
import { emailQueue } from "../queues/email.queue";
import { ProviderError } from "@managers/error.manager";

export const addEmailJob = async(jobName: string, data:EmailOptions) => {
    try { 
        const queue = await emailQueue;
        await queue.add(jobName, data, {
            attempts: 2,
            removeOnComplete: 10, 
            removeOnFail: 5, 
        });
    } catch (error) {
        console.log(error)
        throw new ProviderError(`Failed to add ${jobName} job to queue`);
    }
}