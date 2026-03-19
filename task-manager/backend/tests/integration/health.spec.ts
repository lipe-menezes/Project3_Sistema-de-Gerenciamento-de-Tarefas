import request from "supertest";
import { makeApp } from "../../src/main/app";

describe("Health route", () => {
  it("should return api status ok", async () => {
    const app = makeApp();

    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});