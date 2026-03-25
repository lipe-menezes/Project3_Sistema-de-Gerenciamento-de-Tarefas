import { api } from "./client";

type LoginInput = {
  email: string;
  password: string;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export async function login(data: LoginInput) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function register(data: RegisterInput) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function getMe() {
  const response = await api.get("/me");
  return response.data;
}