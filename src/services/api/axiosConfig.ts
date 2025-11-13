import axios from "axios";
import { store } from "@/store";
import { selectToken } from "@/store/selectors/authSelectors";

// создаём общий axios-инстанс для всех API
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // https://podorozhniky-back.onrender.com
  withCredentials: true, // бек работает с куками / авторизацией
});

// автоматически добавляем токен при наличии
api.interceptors.request.use((config) => {
  const token = selectToken(store.getState());
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

