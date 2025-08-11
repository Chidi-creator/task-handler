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
