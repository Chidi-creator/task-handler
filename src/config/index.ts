import NodemailerConfig from "./nodemailer.config"
import RedisConfig from "./redis.config"
import BullMQConfig from "./bullMq.config"

export const redisConfig = RedisConfig.getInstance()
export const nodemailerConfig = NodemailerConfig.getInstance()
export const bullMQConfig = BullMQConfig.getInstance()



