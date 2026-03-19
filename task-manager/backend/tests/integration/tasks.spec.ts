import request from "supertest";
import { makeApp } from "../../src/main/app";

async function createUserAndLogin(app: ReturnType<typeof makeApp>) {
  const uniqueEmail = `task_${Date.now()}@email.com`;

  await request(app).post("/auth/register").send({
    name: "Lipe",
    email: uniqueEmail,
    password: "123456",
  });

  const loginResponse = await request(app).post("/auth/login").send({
    email: uniqueEmail,
    password: "123456",
  });

  return loginResponse.body.data.accessToken as string;
}

describe("Tasks routes", () => {
  it("should create a task", async () => {
    const app = makeApp();
    const token = await createUserAndLogin(app);

    const response = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Primeira task teste",
        description: "Descrição de teste",
      });

    expect(response.status).toBe(201);
    expect(response.body.data.title).toBe("Primeira task teste");
    expect(response.body.data.status).toBe("todo");
  });

  it("should list tasks", async () => {
    const app = makeApp();
    const token = await createUserAndLogin(app);

    await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task listada",
        description: "Teste",
      });

    const response = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.meta).toHaveProperty("page");
  });
});