"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../../config/env");
const AppError_1 = require("../../../domain/errors/AppError");
function authGuard(req, _res, next) {
    const header = req.headers.authorization;
    if (!header) {
        throw new AppError_1.AppError("UNAUTHORIZED", "Token ausente", 401);
    }
    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
        throw new AppError_1.AppError("UNAUTHORIZED", "Token inválido", 401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        req.user = {
            id: decoded.sub,
            role: decoded.role,
        };
        return next();
    }
    catch {
        throw new AppError_1.AppError("UNAUTHORIZED", "Token inválido ou expirado", 401);
    }
}
