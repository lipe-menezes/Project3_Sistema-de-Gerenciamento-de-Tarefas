"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const AppError_1 = require("../../../domain/errors/AppError");
function errorHandler(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            error: { code: "VALIDATION_ERROR", message: "Dados inválidos", details: err.issues },
        });
    }
    if (err instanceof AppError_1.AppError) {
        return res.status(err.status).json({
            error: { code: err.code, message: err.message, details: null },
        });
    }
    console.error(err);
    return res.status(500).json({
        error: { code: "INTERNAL", message: "Erro interno inesperado", details: null },
    });
}
