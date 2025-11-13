import axios, { AxiosError, AxiosRequestConfig } from "axios";
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

// const API_BASE_URL = (
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
// ).replace(/\/$/, "");

// /** Хранилище accessToken в браузере (HttpOnly куки мы НЕ читаем с фронта) */
// const ACCESS_TOKEN_KEY = "accessToken";

// export const getAccessToken = () =>
//   typeof window === "undefined"
//     ? null
//     : window.localStorage.getItem(ACCESS_TOKEN_KEY);

// export const setAccessToken = (token: string | null) => {
//   if (typeof window === "undefined") return;
//   if (token) window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
//   else window.localStorage.removeItem(ACCESS_TOKEN_KEY);
// };

// /** Главный инстанс */
// export const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // ОБЯЗАТЕЛЬНО: отправляем/получаем HttpOnly cookies (refreshToken, sessionId, и т.д.)
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// /** ---- Очередь для конкурентных 401, чтобы не было гонок при refresh ---- */
// let isRefreshing = false;
// let pendingRequests: Array<() => void> = [];

// const notifyPending = () => {
//   pendingRequests.forEach((cb) => cb());
//   pendingRequests = [];
// };

// /** Подставляем Bearer accessToken в каждый запрос */
// axiosInstance.interceptors.request.use((config) => {
//   const token = getAccessToken();
//   if (token) {
//     config.headers = config.headers || {};
//     (config.headers as Record<string, string>).Authorization =
//       `Bearer ${token}`;
//   }
//   return config;
// });

// /** Отрабатываем 401: один refresh на пачку запросов */
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as
//       | (AxiosRequestConfig & { _retry?: boolean })
//       | undefined;

//     if (!error.response || !originalRequest) {
//       return Promise.reject(error);
//     }

//     const status = error.response.status;

//     // Не трогаем refresh сам по себе, чтобы не зациклиться
//     const isRefreshCall =
//       typeof originalRequest.url === "string" &&
//       originalRequest.url.includes("/auth/refresh");

//     if (status === 401 && !originalRequest._retry && !isRefreshCall) {
//       originalRequest._retry = true;

//       // Если refresh уже идёт — ждём его завершения, потом повторяем запрос
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           pendingRequests.push(async () => {
//             try {
//               const token = getAccessToken();
//               if (token) {
//                 originalRequest.headers = originalRequest.headers || {};
//                 (
//                   originalRequest.headers as Record<string, string>
//                 ).Authorization = `Bearer ${token}`;
//               }
//               const resp = await axiosInstance.request(originalRequest);
//               resolve(resp);
//             } catch (e) {
//               reject(e);
//             }
//           });
//         });
//       }

//       // Запускаем refresh
//       isRefreshing = true;
//       try {
//         // отдельный инстанс, чтобы не словить повторный interceptor
//         const refreshClient = axios.create({
//           baseURL: API_BASE_URL,
//           withCredentials: true,
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         });

//         const refreshResp = await refreshClient.post("/auth/refresh");
//         // по твоей схеме бэк отдаёт accessToken в body: { status, message, data: { accessToken } }
//         const newAccess = (refreshResp.data?.data?.accessToken ??
//           refreshResp.data?.accessToken) as string | undefined;

//         if (newAccess) {
//           setAccessToken(newAccess);
//         } else {
//           // если по какой-то причине токена нет — считаем refresh неуспешным
//           setAccessToken(null);
//           return Promise.reject(error);
//         }

//         // повторяем исходный запрос с новым токеном
//         const token = getAccessToken();
//         if (token) {
//           originalRequest.headers = originalRequest.headers || {};
//           (originalRequest.headers as Record<string, string>).Authorization =
//             `Bearer ${token}`;
//         }

//         const retryResp = await axiosInstance.request(originalRequest);
//         return retryResp;
//       } catch (e) {
//         // refresh не удался — чистим токен и пробрасываем ошибку (UI может редиректить на /login)
//         setAccessToken(null);
//         return Promise.reject(e);
//       } finally {
//         isRefreshing = false;
//         notifyPending();
//       }
//     }

//     // Другие ошибки просто наружу
//     return Promise.reject(error);
//   }
// );
