import { ChildProcessor, Queue, Worker } from "bullmq";
import { RedisClientType, createClient } from "redis";
import { env } from "./env.config";
import { ConnectionOptions } from "./types/bullMq";

export type ProcessorFn = (job: any) => Promise<any>;

class BullMQConfig {
  private static instance: BullMQConfig;
  private connectionOptions: ConnectionOptions;
  private constructor() {
    this.connectionOptions = {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      username: env.REDIS_USERNAME,
      password: env.REDIS_PASSWORD,
    };
  }

  public static getInstance(): BullMQConfig {
    if (!BullMQConfig.instance) {
      BullMQConfig.instance = new BullMQConfig();
    }
    return BullMQConfig.instance;
  }

  public async createQueue(name: string): Promise<Queue> {
    const queue = new Queue(name, {
      connection: this.connectionOptions,
      defaultJobOptions: {
        removeOnComplete: 10, 
        removeOnFail: 5      
      }
    });
    return queue;
  }

 public async createWorker(
    name: string,
    processor: ProcessorFn
 ): Promise<Worker> {
    const worker = new Worker(name, processor, {
      connection: this.connectionOptions,
    });
    return worker;
 }
}   


export default BullMQConfig