import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "../config/env";
import { authRoutes } from "../interfaces/http/routes/authRoutes";
import { errorHandler } from "../interfaces/http/middlewares/errorHandler";
import { meRoutes } from "../interfaces/http/routes/meRoutes";
import { tasksRoutes } from "../interfaces/http/routes/tasksRoutes";

export function makeApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/auth", authRoutes);
  app.use(meRoutes);
  app.use(tasksRoutes);

  app.use(errorHandler);

  return app;
}
