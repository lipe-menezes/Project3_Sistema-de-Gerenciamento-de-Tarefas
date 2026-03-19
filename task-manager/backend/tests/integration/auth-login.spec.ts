import request from "supertest";
import { makeApp } from "../../src/main/app";

describe("Auth - Login", () => {
  it("should login successfully", async () => {
    const app = makeApp();
    const uniqueEmail = `login_${Date.now()}@email.com`;

    await request(app).post("/auth/register").send({
      name: "Lipe",
      email: uniqueEmail,
      password: "123456",
    });

    const response = await request(app).post("/auth/login").send({
      email: uniqueEmail,
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("accessToken");
    expect(response.body.data.user.email).toBe(uniqueEmail);
    expect(response.body.data.user).not.toHaveProperty("passwordHash");
  });

  it("should fail with invalid credentials", async () => {
    const app = makeApp();

    const response = await request(app).post("/auth/login").send({
      email: "naoexiste@email.com",
      password: "123456",
    });

    expect(response.status).toBe(401);
  });
});