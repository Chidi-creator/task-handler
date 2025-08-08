import mongoose from "mongoose";
import { ITask } from "./types/tasks";
import { PriorityLevel, ProgressStatus, TaskType } from "@global/constants";
import { enumValues } from "@utils/helper.utils";

const taskSchema = new mongoose.Schema<ITask>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: enumValues(TaskType),
    },
    priority: {
      type: String,
      enum: enumValues(PriorityLevel),
    },
    status: {
      type: String,
      enum: enumValues(ProgressStatus),
      default: ProgressStatus.NOT_STARTED,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
