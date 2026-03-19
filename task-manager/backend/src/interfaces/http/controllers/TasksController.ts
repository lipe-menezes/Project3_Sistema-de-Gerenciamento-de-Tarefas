import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../../infrastructure/db/prisma";
import { AppError } from "../../../domain/errors/AppError";

const createTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "done"]).optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "done"]).optional(),
});

const listQuerySchema = z.object({
  status: z.enum(["todo", "doing", "done"]).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export class TasksController {
  async create(req: Request, res: Response) {
    if (!req.user) throw new AppError("UNAUTHORIZED", "Não autenticado", 401);

    const body = createTaskSchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status ?? "todo",
        userId: req.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json({ data: task });
  }

  async list(req: Request, res: Response) {
    if (!req.user) throw new AppError("UNAUTHORIZED", "Não autenticado", 401);

    const q = listQuerySchema.parse(req.query);
    const skip = (q.page - 1) * q.limit;

    const where: any = { userId: req.user.id };

    if (q.status) where.status = q.status;
    if (q.search) {
      where.OR = [
        { title: { contains: q.search, mode: "insensitive" } },
        { description: { contains: q.search, mode: "insensitive" } },
      ];
    }

    const [total, tasks] = await Promise.all([
      prisma.task.count({ where }),
      prisma.task.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: q.limit,
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    return res.json({
      data: tasks,
      meta: {
        page: q.page,
        limit: q.limit,
        total,
        totalPages: Math.ceil(total / q.limit),
      },
    });
  }

  async update(req: Request, res: Response) {
    if (!req.user) throw new AppError("UNAUTHORIZED", "Não autenticado", 401);

    const { id } = req.params;
    const body = updateTaskSchema.parse(req.body);

    const existing = await prisma.task.findFirst({
      where: { id, userId: req.user.id },
      select: { id: true },
    });
    if (!existing) throw new AppError("NOT_FOUND", "Tarefa não encontrada", 404);

    const updated = await prisma.task.update({
      where: { id },
      data: body,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({ data: updated });
  }

  async remove(req: Request, res: Response) {
    if (!req.user) throw new AppError("UNAUTHORIZED", "Não autenticado", 401);

    const { id } = req.params;

    const existing = await prisma.task.findFirst({
      where: { id, userId: req.user.id },
      select: { id: true },
    });
    if (!existing) throw new AppError("NOT_FOUND", "Tarefa não encontrada", 404);

    await prisma.task.delete({ where: { id } });

    return res.status(204).send();
  }
}