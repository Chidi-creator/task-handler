import mongoose from "mongoose";
import { ITask } from "./types/tasks";
import { PriorityLevel, ProgressStatus, TaskType } from "@global/constants";

const taskSchema = new mongoose.Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: TaskType,
    },
    priority: {
      type: String,
      enum: PriorityLevel,
    },
    status: {
      type: String,
      enum: ProgressStatus,
      default: ProgressStatus.NOT_STARTED,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

const Task = mongoose.model<ITask>("Task", taskSchema)

export default Task
