import { ValidationError } from "@managers/error.manager";
import { ITask } from "@models/types/tasks";
import { AuthenticatedRequest } from "@service/types/auth";
import TaskUseCase from "@usecases/tasks.usecase";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { validateTask } from "@validation/task.validation";
import responseManager from "@managers/index";
class TaskHandler {
  private taskUseCase: TaskUseCase;
  constructor() {
    this.taskUseCase = new TaskUseCase();
  }
  public createTask = async (req: Request, res: Response) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const data: ITask = {
        ...req.body,
        userId: authReq.user._id,
      };
      const { error } = validateTask(data);
      if (error) {
        throw new ValidationError(
          `Validation failed ${error.details.map((e) => e.message).join(",")}`
        );
      }
      const task = await this.taskUseCase.createTask(data);
      return responseManager.success(
        res,
        task,
        "Task created successfully",
        201
      );
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  public findTaskByUserId = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const tasks: ITask[] | null = await this.taskUseCase.findTaskByUserId(
        new Types.ObjectId(userId)
      );
      if (!tasks) {
        return responseManager.notFound(
          res,
          "Tasks not found or could not be fetched"
        );
      }
      return responseManager.success(
        res,
        tasks,
        "Tasks fetched successfully",
        200
      );
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  public findTaskById = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.taskId;
      const task = await this.taskUseCase.findTaskById(
        new Types.ObjectId(taskId)
      );
      if (!task) {
        return responseManager.notFound(
          res,
          "Task not found or could not be fetched"
        );
      }

      return responseManager.success(
        res,
        task,
        "Task fetched successfully",
        200
      );
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  public findAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskUseCase.findAllTasks();
      return responseManager.success(
        res,
        tasks,
        "Tasks fetched successfully",
        200
      );
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  public updateTaskById = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.taskId;

      const updateData: Partial<ITask> = req.body;
      const task = await this.taskUseCase.updateTaskById(
        new Types.ObjectId(taskId),
        updateData
      );

      if (!task) {
        return responseManager.notFound(
          res,
          "Task not found or could not be updated"
        );
      }

      return responseManager.success(
        res,
        task,
        "Task updated successfully",
        200
      );
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  public deleteTaskById = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.taskId;
      const task = await this.taskUseCase.deleteTaskById(
        new Types.ObjectId(taskId)
      );

      if (!task) {
        return responseManager.notFound(
          res,
          "Task not found or could not be deleted"
        );
      }

      return responseManager.success(
        res,
        task,
        "Task deleted successfully",
        200
      );
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };
}

export default TaskHandler;
