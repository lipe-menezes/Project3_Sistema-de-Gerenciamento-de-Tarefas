import { AppError } from "../../../domain/errors/AppError";

export class LoginUser {
  constructor(
    private users: any,
    private crypto: any,
    private token: any
  ) {}

  async execute({ email, password }: any) {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new AppError("UNAUTHORIZED", "Credenciais inválidas", 401);
    }

    const valid = await this.crypto.compare(password, user.passwordHash);

    if (!valid) {
      throw new AppError("UNAUTHORIZED", "Credenciais inválidas", 401);
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