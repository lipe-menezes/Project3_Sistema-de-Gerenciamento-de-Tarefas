"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authSchemas_1 = require("../validators/authSchemas");
const PrismaUserRepository_1 = require("../../../infrastructure/repositories/PrismaUserRepository");
const BcryptCryptoProvider_1 = require("../../../infrastructure/providers/BcryptCryptoProvider");
const JwtTokenProvider_1 = require("../../../infrastructure/providers/JwtTokenProvider");
const RegisterUser_1 = require("../../../application/use-cases/auth/RegisterUser");
const LoginUser_1 = require("../../../application/use-cases/auth/LoginUser");
class AuthController {
    async register(req, res) {
        const body = authSchemas_1.registerSchema.parse(req.body);
        const users = new PrismaUserRepository_1.PrismaUserRepository();
        const crypto = new BcryptCryptoProvider_1.BcryptCryptoProvider();
        const useCase = new RegisterUser_1.RegisterUser(users, crypto);
        const user = await useCase.execute(body);
        return res.status(201).json({ data: user });
    }
    async login(req, res) {
        const body = authSchemas_1.loginSchema.parse(req.body);
        const users = new PrismaUserRepository_1.PrismaUserRepository();
        const crypto = new BcryptCryptoProvider_1.BcryptCryptoProvider();
        const tokens = new JwtTokenProvider_1.JwtTokenProvider();
        const useCase = new LoginUser_1.LoginUser(users, crypto, tokens);
        const result = await useCase.execute(body);
        return res.status(200).json({ data: result });
    }
}
exports.AuthController = AuthController;
