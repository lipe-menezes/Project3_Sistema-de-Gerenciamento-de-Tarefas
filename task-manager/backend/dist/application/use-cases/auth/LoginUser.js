"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const AppError_1 = require("../../../domain/errors/AppError");
class LoginUser {
    constructor(users, crypto, token) {
        this.users = users;
        this.crypto = crypto;
        this.token = token;
    }
    async execute({ email, password }) {
        const user = await this.users.findByEmail(email);
        if (!user) {
            throw new AppError_1.AppError("UNAUTHORIZED", "Credenciais inválidas", 401);
        }
        const valid = await this.crypto.compare(password, user.passwordHash);
        if (!valid) {
            throw new AppError_1.AppError("UNAUTHORIZED", "Credenciais inválidas", 401);
        }
        const accessToken = this.token.sign({
            sub: user.id,
            role: user.role,
        });
        return {
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}
exports.LoginUser = LoginUser;
