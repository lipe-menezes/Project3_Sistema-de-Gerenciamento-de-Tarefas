import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validators/authSchemas";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { BcryptCryptoProvider } from "../../../infrastructure/providers/BcryptCryptoProvider";
import { JwtTokenProvider } from "../../../infrastructure/providers/JwtTokenProvider";
import { RegisterUser } from "../../../application/use-cases/auth/RegisterUser";
import { LoginUser } from "../../../application/use-cases/auth/LoginUser";

export class AuthController {
  async register(req: Request, res: Response) {
    const body = registerSchema.parse(req.body);

    const users = new PrismaUserRepository();
    const crypto = new BcryptCryptoProvider();

    const useCase = new RegisterUser(users, crypto);
    const user = await useCase.execute(body);

    return res.status(201).json({ data: user });
  }

  async login(req: Request, res: Response) {
    const body = loginSchema.parse(req.body);

    const users = new PrismaUserRepository();
    const crypto = new BcryptCryptoProvider();
    const tokens = new JwtTokenProvider();

    const useCase = new LoginUser(users, crypto, tokens);
    const result = await useCase.execute(body);

    return res.status(200).json({ data: result });
  }
}