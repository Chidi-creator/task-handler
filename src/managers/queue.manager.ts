import { bullMQConfig } from "@config/index";
import { ProcessorFn } from "@config/bullMq.config";

class QueueManager {
  public async createQueue(name: string) {
    return await bullMQConfig.createQueue(name);
  }

  public async createWorker(name: string, processor: ProcessorFn) {
    return bullMQConfig.createWorker(name, processor);
  }
}

export default QueueManager;
