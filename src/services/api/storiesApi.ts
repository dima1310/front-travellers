import axios from "axios";
import { api } from "./axiosConfig";
import type { Story, StoriesApiPage, StoriesResponse } from "@/types/story.types";

const BASE_URL = "https://podorozhniky-back.onrender.com/api";

// 🔹 Створення історії 
export const createStory = async (formData: FormData) => {
  const response = await axios.post(`${BASE_URL}/stories`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
};

// 🔹 Основний storiesApi з main
export const storiesApi = {
  async popular(): Promise<Story[]> {
    const { data } = await api.get<{
      status: number;
      message: string;
      data: StoriesApiPage;
    }>("/stories", {
      params: {
        page: 1,
        perPage: 4,
        sortBy: "favoriteCount",
        sortOrder: "desc",
      },
    });

    return data.data.data;
  },

  async list(page = 1, perPage = 12): Promise<StoriesResponse> {
    const { data } = await api.get<{
      status: number;
      message: string;
      data: StoriesApiPage;
    }>("/stories", {
      params: {
        page,
        perPage,
        sortBy: "date",
        sortOrder: "desc",
      },
    });

    const pageData = data.data;

    return {
      items: pageData.data,
      page: pageData.page,
      limit: pageData.perPage,
      total: pageData.total,
      totalPages: pageData.totalPages,
      hasNextPage: pageData.hasNextPage,
    };
  },
};
