import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const authRoutes = Router();
const controller = new AuthController();

authRoutes.post("/register", (req, res, next) =>
  controller.register(req, res).catch(next)
);

authRoutes.post("/login", (req, res, next) =>
  controller.login(req, res).catch(next)
);