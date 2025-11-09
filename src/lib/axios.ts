import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // для cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor для обробки помилок
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Якщо 401 і це не запит на refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Спроба оновити токен
                await axiosInstance.post('/auth/refresh');
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Якщо refresh не вдався - редирект на логін
                if (typeof window !== 'undefined') {
                    window.location.href = '/auth/login';
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);