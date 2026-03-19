import { Request, Response } from "express";
import { prisma } from "../../../infrastructure/db/prisma";
import { AppError } from "../../../domain/errors/AppError";

export class MeController {
  async me(req: Request, res: Response) {
    if (!req.user) throw new AppError("UNAUTHORIZED", "Não autenticado", 401);

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) throw new AppError("UNAUTHORIZED", "Usuário não encontrado", 401);

    return res.status(200).json({ data: user });
  }
}