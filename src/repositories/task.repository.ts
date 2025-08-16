import { ITask } from "@models/types/tasks";
import Task from "@models/Task";
import { Types } from "mongoose";
import { DatabaseError } from "@managers/error.manager";
class TaskRepository {
  async createTask(task: ITask) {
    try {
      const newTask = await Task.create(task);
      return newTask;
    } catch (error: any) {
      throw new DatabaseError("Error creating Task");
    }
  }

  async findTaskByUserId(userId: Types.ObjectId): Promise<ITask[] | null> {
    try {
      const tasks = await Task.find({ userId: userId });
      return tasks;
    } catch (error: any) {
      throw new DatabaseError("Error fetching Tasks");
    }
  }

  async findTaskById(taskId: Types.ObjectId): Promise<ITask | null> {
    try {
      const task = await Task.findById(taskId);
      return task;
    } catch (error: any) {
      throw new DatabaseError("Error fetching Task");
    }
  }

  async findAllTasks(): Promise<ITask[]> {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (error: any) {
      throw new DatabaseError("Error fetching all Tasks");
    }
  }

  async updateTaskById(
    taskId: Types.ObjectId,
    updateData: Partial<ITask>
  ): Promise<ITask | null> {
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { $set: updateData },
        { new: true }
      );
      return task;
    } catch (error: any) {
      throw new DatabaseError("Error updating Task");
    }
  }

  async deleteTaskById(taskId: Types.ObjectId): Promise<ITask | null> {
    try {
      const task = await Task.findByIdAndDelete(taskId);
      return task;
    } catch (error: any) {
      throw new DatabaseError("Error deleting Task");
    }
  }
  async groupTasksByUserId(): Promise<any[]> {
    try {
      const tasks = await Task.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $group: {
            _id: "$userId",
            tasks: {
              $push: {
                title: "$title",
                dueTime: "$dueTime",
              },
            },
            email: { $first: "$user.email" },
          },
        },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            tasks: 1,
            email: 1,
          },
        },
      ]);

      return tasks;
    } catch (error: any) {
      throw new DatabaseError("Error fetching Tasks");
    }
  }
}

export default TaskRepository;
