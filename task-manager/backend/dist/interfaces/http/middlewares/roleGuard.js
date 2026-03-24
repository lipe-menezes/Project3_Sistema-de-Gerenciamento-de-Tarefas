"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleGuard = roleGuard;
const AppError_1 = require("../../../domain/errors/AppError");
function roleGuard(...allowed) {
    return (req, _res, next) => {
        if (!req.user)
            throw new AppError_1.AppError("UNAUTHORIZED", "Não autenticado", 401);
        if (!allowed.includes(req.user.role)) {
            throw new AppError_1.AppError("FORBIDDEN", "Acesso negado", 403);
        }
        return next();
    };
}
