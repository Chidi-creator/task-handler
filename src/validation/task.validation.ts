import Joi from "joi";
import { ITask } from "../models/types/tasks";
import {
  PriorityLevel,
  ProgressStatus,
  TaskType,
  TIME_REGEX,
} from "@global/constants";
import { enumValues } from "@utils/helper.utils";
import { Types } from "mongoose";

const objectId = Joi.alternatives().try(
  Joi.string().hex().length(24),
  Joi.custom((value, helpers) => {
    if (Types.ObjectId.isValid(value)) {
      return value;
    }
    return helpers.error('any.invalid');
  }, 'ObjectId validation')
).required();


export const validateTask = (object: ITask) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    userId: objectId.required(),
    type: Joi.string()
      .valid(...enumValues(TaskType))
      .required(),
    priority: Joi.string()
      .valid(...enumValues(PriorityLevel))
      .required(),
    status: Joi.string()
      .valid(...enumValues(ProgressStatus))
      .optional(),
    dueTime: Joi.alternatives()
      .try(Joi.string().pattern(TIME_REGEX), Joi.date())
      .optional(),
  });
  return schema.validate(object);
};

export const validateTaskUpdate = (object: ITask) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    userId: objectId.optional(),
    type: Joi.string()
      .valid(...enumValues(TaskType))
      .optional(),
    priority: Joi.string()
      .valid(...enumValues(PriorityLevel))
      .optional(),
    status: Joi.string()
      .valid(...enumValues(ProgressStatus))
      .optional(),
    dueTime: Joi.alternatives()
      .try(Joi.string().pattern(TIME_REGEX), Joi.date())
      .optional(),
  });
  return schema.validate(object);
};
