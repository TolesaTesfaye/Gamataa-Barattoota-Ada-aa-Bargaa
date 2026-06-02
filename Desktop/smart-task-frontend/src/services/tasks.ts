import api from "./api";

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  createdAt: string;
  user?: UserResponse;
};

export type TaskRequest = {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string | null;
};

export const getMyTasks = async (): Promise<Task[]> => {
  const response = await api.get("/api/tasks");
  return response.data;
};

export const createTask = async (data: TaskRequest): Promise<Task> => {
  const response = await api.post("/api/tasks", data);
  return response.data;
};

export const updateTask = async (
  id: number,
  data: TaskRequest
): Promise<Task> => {
  const response = await api.put(`/api/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/api/tasks/${id}`);
};

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await api.get("/api/admin/tasks");
  return response.data;
};

export const getAllUsers = async (): Promise<UserResponse[]> => {
  const response = await api.get("/api/admin/users");
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/users/${id}`);
};
