"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../../../infrastructure/db/prisma");
const AppError_1 = require("../../../domain/errors/AppError");
const createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Título é obrigatório"),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(["todo", "doing", "done"]).optional(),
});
const updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(["todo", "doing", "done"]).optional(),
});
const listQuerySchema = zod_1.z.object({
    status: zod_1.z.enum(["todo", "doing", "done"]).optional(),
    search: zod_1.z.string().optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(50).default(10),
});
class TasksController {
    async create(req, res) {
        if (!req.user)
            throw new AppError_1.AppError("UNAUTHORIZED", "Não autenticado", 401);
        const body = createTaskSchema.parse(req.body);
        const task = await prisma_1.prisma.task.create({
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
    async list(req, res) {
        if (!req.user)
            throw new AppError_1.AppError("UNAUTHORIZED", "Não autenticado", 401);
        const q = listQuerySchema.parse(req.query);
        const skip = (q.page - 1) * q.limit;
        const where = { userId: req.user.id };
        if (q.status)
            where.status = q.status;
        if (q.search) {
            where.OR = [
                { title: { contains: q.search, mode: "insensitive" } },
                { description: { contains: q.search, mode: "insensitive" } },
            ];
        }
        const [total, tasks] = await Promise.all([
            prisma_1.prisma.task.count({ where }),
            prisma_1.prisma.task.findMany({
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
    async update(req, res) {
        if (!req.user)
            throw new AppError_1.AppError("UNAUTHORIZED", "Não autenticado", 401);
        const id = String(req.params.id);
        const body = updateTaskSchema.parse(req.body);
        const existing = await prisma_1.prisma.task.findFirst({
            where: { id, userId: req.user.id },
            select: { id: true },
        });
        if (!existing)
            throw new AppError_1.AppError("NOT_FOUND", "Tarefa não encontrada", 404);
        const updated = await prisma_1.prisma.task.update({
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
    async remove(req, res) {
        if (!req.user)
            throw new AppError_1.AppError("UNAUTHORIZED", "Não autenticado", 401);
        const id = String(req.params.id);
        const existing = await prisma_1.prisma.task.findFirst({
            where: { id, userId: req.user.id },
            select: { id: true },
        });
        if (!existing)
            throw new AppError_1.AppError("NOT_FOUND", "Tarefa não encontrada", 404);
        await prisma_1.prisma.task.delete({ where: { id } });
        return res.status(204).send();
    }
}
exports.TasksController = TasksController;
