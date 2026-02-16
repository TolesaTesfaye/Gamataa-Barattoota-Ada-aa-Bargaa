import api from "./api";

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export const getAllUsers = async (): Promise<UserResponse[]> => {
  const response = await api.get("/api/admin/users");
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/users/${id}`);
};
