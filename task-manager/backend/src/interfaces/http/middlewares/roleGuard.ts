import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../domain/errors/AppError";

export function roleGuard(...allowed: Array<"admin" | "user">) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("UNAUTHORIZED", "Não autenticado", 401);

    if (!allowed.includes(req.user.role)) {
      throw new AppError("FORBIDDEN", "Acesso negado", 403);
    }

    return next();
  };
}