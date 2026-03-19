import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../../../domain/errors/AppError";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "Dados inválidos", details: err.issues },
    });
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: { code: err.code, message: err.message, details: null },
    });
  }

  console.error(err);
  return res.status(500).json({
    error: { code: "INTERNAL", message: "Erro interno inesperado", details: null },
  });
}