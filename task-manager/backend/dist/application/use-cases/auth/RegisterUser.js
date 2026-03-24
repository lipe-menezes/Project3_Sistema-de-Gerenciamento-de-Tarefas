"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const AppError_1 = require("../../../domain/errors/AppError");
class RegisterUser {
    constructor(users, crypto) {
        this.users = users;
        this.crypto = crypto;
    }
    async execute({ name, email, password }) {
        const exists = await this.users.findByEmail(email);
        if (exists) {
            throw new AppError_1.AppError("CONFLICT", "Email já cadastrado", 409);
        }
        const passwordHash = await this.crypto.hash(password);
        const user = await this.users.create({
            name,
            email,
            passwordHash,
            role: "user",
        });
        return { id: user.id, name: user.name, email: user.email, role: user.role };
    }
}
exports.RegisterUser = RegisterUser;
