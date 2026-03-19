import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env";
import { AppError } from "../../../domain/errors/AppError";

type JwtPayload = {
  sub: string;
  role: "admin" | "user";
};

export function authGuard(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header) {
    throw new AppError("UNAUTHORIZED", "Token ausente", 401);
  }

  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    throw new AppError("UNAUTHORIZED", "Token inválido", 401);
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch {
    throw new AppError("UNAUTHORIZED", "Token inválido ou expirado", 401);
  }
}