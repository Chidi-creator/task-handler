import Joi from "joi";
import { ITask } from "../models/types/tasks";
import { PriorityLevel, ProgressStatus, TaskType } from "@global/constants";
import { enumValues } from "@utils/helper.utils";

export const validateTask = (object: ITask) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    userId: Joi.string().required(),
    type: Joi.string().valid(...enumValues(TaskType)).required(),
    priority: Joi.string().valid(...enumValues(PriorityLevel)).required(),
    status: Joi.string().valid(...enumValues(ProgressStatus)).optional(),
  });
  return schema.validate(object);
};

export const validateTaskUpdate = (object: ITask) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    userId: Joi.string().optional(),
    type: Joi.string().valid(...enumValues(TaskType)).optional(),
    priority: Joi.string().valid(...enumValues(PriorityLevel)).optional(),
    status: Joi.string().valid(...enumValues(ProgressStatus)).optional(),
  });
  return schema.validate(object);
};
