import { ITask } from "@models/types/tasks";
import TaskRepository from "@repositories/task.repository";
import { Types } from "mongoose";
import CacheService from "@service/cache.service";
import { NotFoundError } from "@managers/error.manager";

class TaskUseCase {
  private taskRepository: TaskRepository;
  private cacheService: CacheService;
  constructor() {
    this.taskRepository = new TaskRepository();
    this.cacheService = new CacheService();
  }

  async createTask(task: ITask) {
    try {
      const newTask = await this.taskRepository.createTask(task);
      await this.cacheService.del(`tasks:${task.userId}`);
      return newTask;
    } catch (error: any) {
      throw new Error("Error creating Task");
    }
  }

  async findTaskByUserId(userId: Types.ObjectId): Promise<ITask[] | null> {
    try {
      const cachedTasks = await this.cacheService.get<ITask[]>(
        `tasks:${userId}`
      );
      if (cachedTasks) {
        return cachedTasks;
      }
      const tasks = await this.taskRepository.findTaskByUserId(userId);
      if (!tasks) {
        throw new Error("Tasks not found");
      }
      await this.cacheService.set<ITask[]>(`tasks:${userId}`, tasks);
      return tasks;
    } catch (error: any) {
      throw new Error("Error fetching Tasks");
    }
  }

  async findTaskById(taskId: Types.ObjectId): Promise<ITask | null> {
    try {
      const cachedTask = await this.cacheService.get<ITask>(`task:${taskId}`);
      if (cachedTask) {
        return cachedTask;
      }
      const task = await this.taskRepository.findTaskById(taskId);
      if (!task) {
        throw new NotFoundError("Task not found");
      }
      await this.cacheService.set<ITask>(`task:${taskId}`, task);
      return task;
    } catch (error: any) {
      throw new Error("Error fetching Task");
    }
  }

  async findAllTasks(): Promise<ITask[]> {
    try {
      const tasks = await this.taskRepository.findAllTasks();
      return tasks;
    } catch (error: any) {
      throw new Error("Error fetching all Tasks");
    }
  }

  async updateTaskById(
    taskId: Types.ObjectId,
    updateData: Partial<ITask>
  ): Promise<ITask | null> {
    try {
      const task = await this.taskRepository.updateTaskById(taskId, updateData);
      return task;
    } catch (error: any) {
      throw new Error("Error updating Task");
    }
  }

  async deleteTaskById(taskId: Types.ObjectId): Promise<ITask | null> {
    try {
      const task = await this.taskRepository.deleteTaskById(taskId);
      return task;
    } catch (error: any) {
      throw new Error("Error deleting Task");
    }
  }
}

export default TaskUseCase;
