import { api } from "./client";

export async function getTasks() {
  const response = await api.get("/tasks");
  return response.data;
}

export async function createTask(data: { title: string; description?: string }) {
  const response = await api.post("/tasks", data);
  return response.data;
}

export async function updateTask(
  id: string,
  data: { title?: string; description?: string; status?: "todo" | "doing" | "done" }
) {
  const response = await api.patch(`/tasks/${id}`, data);
  return response.data;
}

export async function deleteTask(id: string) {
  await api.delete(`/tasks/${id}`);
}