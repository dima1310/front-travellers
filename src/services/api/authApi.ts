import { api } from "./axiosConfig";
import type { LoginDto, RegisterDto, AuthResponse } from "@/types/auth.types";

export const authApi = {
  async login(dto: LoginDto) {
    const { data } = await api.post<AuthResponse>("/auth/login", dto);
    return data;
  },
  async register(dto: RegisterDto) {
    const { data } = await api.post<AuthResponse>("/auth/register", dto);
    return data;
  },
  async me() {
    const { data } = await api.get<AuthResponse>("/auth/me");
    return data;
  },
};
