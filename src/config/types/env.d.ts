export interface EnvConfig {
    MONGO_URI: string;
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    JWT_SECRET: string;
    MAIL_HOST: string;
    MAIL_PORT: number;
    MAIL_SECURE: boolean;
    MAIL_SERVICE: string;
    MAIL_USER: string;
    MAIL_PASS: string;
}