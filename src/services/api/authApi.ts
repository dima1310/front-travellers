import {axiosInstance} from "@/lib/axios";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export const authApi = {
    login: (data: LoginPayload) => axiosInstance.post("/auth/login", data),
    register: (data: RegisterPayload) =>
        axiosInstance.post("/auth/register", data),
    logout: () => axiosInstance.post("/auth/logout"),
    refresh: () => axiosInstance.post("/auth/refresh"),
};
