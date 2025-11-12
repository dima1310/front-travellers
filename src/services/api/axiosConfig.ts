import axios from "axios";
import { store } from "@/store";
import { selectToken } from "@/store/selectors/authSelectors";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = selectToken(state);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
