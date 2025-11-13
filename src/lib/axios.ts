import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // для cookies
  headers: {
    "Content-Type": "application/json",
  },
});
