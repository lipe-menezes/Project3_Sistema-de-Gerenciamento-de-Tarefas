import { Router } from "express";
import { TasksController } from "../controllers/TasksController";
import { authGuard } from "../middlewares/authGuard";

export const tasksRoutes = Router();
const controller = new TasksController();

tasksRoutes.use(authGuard);

tasksRoutes.post("/tasks", (req, res, next) => controller.create(req, res).catch(next));
tasksRoutes.get("/tasks", (req, res, next) => controller.list(req, res).catch(next));
tasksRoutes.patch("/tasks/:id", (req, res, next) => controller.update(req, res).catch(next));
tasksRoutes.delete("/tasks/:id", (req, res, next) => controller.remove(req, res).catch(next));