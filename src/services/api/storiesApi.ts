import { api } from "./axiosConfig";
import type { Story, StoriesApiPage, StoriesResponse } from "@/types/story.types";

export const storiesApi = {
  // 🔹 Популярні історії — сортируем по favoriteCount
  async popular(): Promise<Story[]> {
    const { data } = await api.get<{
      status: number;
      message: string;
      data: StoriesApiPage;
    }>("/stories", {
      params: {
        page: 1,
        perPage: 4,             // сколько карточек на главной
        sortBy: "favoriteCount",
        sortOrder: "desc",
      },
    });

    // data: { status, message, data: StoriesApiPage }
    return data.data.data;      // <-- здесь data.data: StoriesApiPage, у него есть .data: Story[]
  },

  // 🔹 Пагінований список історій (для /stories и infiniteQuery)
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

    const pageData = data.data; // тип StoriesApiPage

    // Маппим в удобный формат для UI
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
