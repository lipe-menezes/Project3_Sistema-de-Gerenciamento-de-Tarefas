import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import { MeController } from "../controllers/MeController";

export const meRoutes = Router();
const controller = new MeController();

meRoutes.get("/me", authGuard, (req, res, next) =>
  controller.me(req, res).catch(next)
);