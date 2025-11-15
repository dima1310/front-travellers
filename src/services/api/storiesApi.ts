import { api } from "./axiosConfig";
import type {
  Story,
  StoriesApiPage,
  StoriesResponse,
  CreatedStoryResponse,
} from "@/types/story.types";

const STORIES_PREFIX = "/stories";

// 🔹 Создание истории (POST /stories)
export const createStory = async (
  formData: FormData
): Promise<CreatedStoryResponse> => {
  const { data } = await api.post<CreatedStoryResponse>(
    STORIES_PREFIX,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

// 🔹 Обновление истории (PATCH /stories/:storyId)
export const updateStory = async (
  storyId: string,
  formData: FormData
): Promise<CreatedStoryResponse> => {
  const { data } = await api.patch<CreatedStoryResponse>(
    `${STORIES_PREFIX}/${storyId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// 🔹 Получить историю по id (GET /stories/:storyId)
export const getStoryById = async (storyId: string): Promise<Story> => {
  const { data } = await api.get<{
    status: number;
    message: string;
    data: Story;
  }>(`${STORIES_PREFIX}/${storyId}`);

  return data.data;
};

// 🔹 Основной storiesApi
export const storiesApi = {
  async popular(): Promise<Story[]> {
    const { data } = await api.get<{
      status: number;
      message: string;
      data: StoriesApiPage;
    }>(STORIES_PREFIX, {
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
    }>(STORIES_PREFIX, {
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
