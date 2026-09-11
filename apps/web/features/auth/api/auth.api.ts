import { api } from "@/lib/api";

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "../types/auth.types";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get("/auth/profile");

  return response.data;
};