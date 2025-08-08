import { ITask } from "@models/types/tasks";
import { AuthenticatedRequest } from "@service/types/auth";
import TaskUseCase from "@usecases/tasks.usecase";
import { Request, Response } from "express";
import { Types } from "mongoose";
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
        userId: authReq.user._id
      }
      const task = await this.taskUseCase.createTask(data);
      return res.status(200).json(task);
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  };

  public findTaskByUserId = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const tasks = await this.taskUseCase.findTaskByUserId(
        new Types.ObjectId(userId)
      );
      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  };

  public findTaskById = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.taskId;
      const task = await this.taskUseCase.findTaskById(
        new Types.ObjectId(taskId)
      );
      return res.status(200).json(task);
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  };

  public findAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskUseCase.findAllTasks();
      return res.status(200).json(tasks);
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
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
      return res.status(200).json(task);
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  };

  public deleteTaskById = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.taskId;
      const task = await this.taskUseCase.deleteTaskById(
        new Types.ObjectId(taskId)
      );
      return res.status(200).json(task);
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  };
}

export default TaskHandler;
