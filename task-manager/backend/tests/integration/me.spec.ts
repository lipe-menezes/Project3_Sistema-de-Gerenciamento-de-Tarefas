import request from "supertest";
import { makeApp } from "../../src/main/app";

describe("Me route", () => {
  it("should return authenticated user", async () => {
    const app = makeApp();
    const uniqueEmail = `me_${Date.now()}@email.com`;

    await request(app).post("/auth/register").send({
      name: "Lipe",
      email: uniqueEmail,
      password: "123456",
    });

    const loginResponse = await request(app).post("/auth/login").send({
      email: uniqueEmail,
      password: "123456",
    });

    const token = loginResponse.body.data.accessToken;

    const response = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe(uniqueEmail);
  });

  it("should fail without token", async () => {
    const app = makeApp();

    const response = await request(app).get("/me");

    expect(response.status).toBe(401);
  });
});