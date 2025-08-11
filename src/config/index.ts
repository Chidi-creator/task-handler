import NodemailerConfig from "./nodemailer.config"
import RedisConfig from "./redis.config"

export const redisConfig = RedisConfig.getInstance()
export const nodemailerConfig = NodemailerConfig.getInstance()


