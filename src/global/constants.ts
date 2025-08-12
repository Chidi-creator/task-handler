import { NodeMailerConfigType } from "@config/types/email";
import { env } from "@config/env.config";

export enum ProgressStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  ON_HOLD = "on_hold",
  CANCELLED = "cancelled",
}
export enum PriorityLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}
export enum TaskType {
  PERSONAL = "personal",
  WORK = "work",
  SHOPPING = "shopping",
  OTHER = "other",
}

export const nodeMailerConfig: NodeMailerConfigType = {
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  secure: env.MAIL_SECURE,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
};

export enum WORKERS {
  EMAIL = "email",
}

export enum JOBS {
  SEND_WELCOME_EMAIL = "sendWelcomeEmail",
}


export const DATE_REGEX =  /^\d{4}-\d{2}-\d{2}$/;

export const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;
