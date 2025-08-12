import { Document } from "mongoose";
import { Types } from "mongoose";
import { TaskType, PriorityLevel, ProgressStatus  } from "src/global/constants";

export interface ITask extends Document{
    title: string;
    userId: Types.ObjectId;
    description?: string;
    type: TaskType;
    priority: PriorityLevel;
    status?: ProgressStatus;
    deletedAt?: Date;
    dueTime?: string | Date | undefined;
}

