import { AppError } from "../../../domain/errors/AppError";

export class RegisterUser {
  constructor(private users: any, private crypto: any) {}

  async execute({ name, email, password }: any) {
    const exists = await this.users.findByEmail(email);
    if (exists) {
      throw new AppError("CONFLICT", "Email já cadastrado", 409);
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