import { api } from "./axiosConfig";
import type { Story, StoriesResponse } from "@/types/story.types";

export const storiesApi = {
  async popular(): Promise<Story[]> {
    const { data } = await api.get<Story[]>("/stories/popular");
    return data;
  },
  async list(page = 1, limit = 12): Promise<StoriesResponse> {
    const { data } = await api.get<StoriesResponse>("/stories", {
      params: { page, limit },
    });
    return data;
  },
};
