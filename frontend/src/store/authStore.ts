import { create } from "zustand";
import { authService } from "../services/authService";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: authService.getCurrentUser(),
  token: localStorage.getItem("token"),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login({ email, password });
      set({
        user: response.user,
        token: response.token,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register({
        email,
        password,
        firstName,
        lastName,
      });
      set({
        user: response.user,
        token: response.token,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Registration failed",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, token: null, error: null });
  },

  setUser: (user: User | null) => {
    set({ user });
  },

  clearError: () => {
    set({ error: null });
  },
}));
