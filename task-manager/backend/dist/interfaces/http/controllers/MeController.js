"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeController = void 0;
const prisma_1 = require("../../../infrastructure/db/prisma");
const AppError_1 = require("../../../domain/errors/AppError");
class MeController {
    async me(req, res) {
        if (!req.user)
            throw new AppError_1.AppError("UNAUTHORIZED", "Não autenticado", 401);
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, name: true, email: true, role: true },
        });
        if (!user)
            throw new AppError_1.AppError("UNAUTHORIZED", "Usuário não encontrado", 401);
        return res.status(200).json({ data: user });
    }
}
exports.MeController = MeController;
