import request from "supertest";
import { makeApp } from "../../src/main/app";

describe("Auth - Register", () => {
  it("should register a new user", async () => {
    const app = makeApp();

    const uniqueEmail = `lipe_${Date.now()}@email.com`;

    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "Lipe",
        email: uniqueEmail,
        password: "123456",
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.name).toBe("Lipe");
    expect(response.body.data.email).toBe(uniqueEmail);
    expect(response.body.data.role).toBe("user");
  });

  it("should not allow duplicate email", async () => {
    const app = makeApp();
    const uniqueEmail = `duplicado_${Date.now()}@email.com`;

    await request(app).post("/auth/register").send({
      name: "Lipe",
      email: uniqueEmail,
      password: "123456",
    });

    const response = await request(app).post("/auth/register").send({
      name: "Lipe",
      email: uniqueEmail,
      password: "123456",
    });

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("CONFLICT");
  });
});