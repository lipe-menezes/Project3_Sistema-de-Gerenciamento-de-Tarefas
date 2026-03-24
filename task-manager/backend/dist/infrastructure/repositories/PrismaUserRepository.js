"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const prisma_1 = require("../db/prisma");
class PrismaUserRepository {
    async findByEmail(email) {
        return prisma_1.prisma.user.findUnique({ where: { email } });
    }
    async create(data) {
        return prisma_1.prisma.user.create({ data });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
