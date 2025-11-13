// "use client";

// import { axiosInstance, setAccessToken } from "./axiosConfig";

// export type LoginDto = { email: string; password: string };
// export type RegisterDto = { name: string; email: string; password: string };

// export type AuthResponse = {
//   status: number;
//   message: string;
//   data: { accessToken: string };
// };

// export type User = {
//   _id: string;
//   name: string;
//   email: string;
//   avatar?: string;
//   bio?: string;
//   // ...что у тебя есть в схеме
// };

// /** POST /auth/login — ставит 3 HttpOnly cookie на бэке и возвращает accessToken в body */
// export async function login(dto: LoginDto) {
//   const resp = await axiosInstance.post<AuthResponse>("/auth/login", dto);
//   const token = resp.data?.data?.accessToken ?? resp.data?.accessToken;
//   if (token) setAccessToken(token);
//   return resp.data;
// }

// /** POST /auth/register — обычно сразу логинит и тоже шлёт 3 куки + accessToken */
// export async function register(dto: RegisterDto) {
//   const resp = await axiosInstance.post<AuthResponse>("/auth/register", dto);
//   const token = resp.data?.data?.accessToken ?? resp.data?.accessToken;
//   if (token) setAccessToken(token);
//   return resp.data;
// }

// /** POST /auth/logout — гасит куки на бэке; чистим локальный accessToken */
// export async function logout() {
//   await axiosInstance.post("/auth/logout");
//   setAccessToken(null);
// }

// /** GET /users/current — приватный эндпоинт */
// export async function getCurrentUser() {
//   const resp = await axiosInstance.get<{
//     status: number;
//     message: string;
//     data: User;
//   }>("/users/current");
//   return resp.data.data;
// }
