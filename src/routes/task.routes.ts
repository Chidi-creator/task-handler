import express from "express";
import { AuthService } from "@service/auth.service";
import TaskHandler from "@handlers/task.handler";

const router = express.Router();

const authService = new AuthService();
const taskHandler = new TaskHandler();

router.route("/create").post(authService.auth, taskHandler.createTask);
router.route("/find/:userId").get(authService.auth, taskHandler.findTaskByUserId);
router.route("/find/:taskId").get(authService.auth, taskHandler.findTaskById);
router.route("/update/:taskId").put(authService.auth, taskHandler.updateTaskById);
router.route("/delete/:taskId").delete(authService.auth, taskHandler.deleteTaskById);

export default router;
