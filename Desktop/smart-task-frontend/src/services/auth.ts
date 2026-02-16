import api from "./api";

export type AuthRequest = {
  name?: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  userId: number;
  name: string;
  email: string;
  role: string;
};

export const register = async (
  data: AuthRequest & { name: string }
): Promise<AuthResponse> => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const login = async (data: AuthRequest): Promise<AuthResponse> => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};
