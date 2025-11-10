import { axiosInstance } from "./axiosConfig";
import { Story } from "@/types/story.types";

export const getStories = async (): Promise<Story[]> => {
  const { data } = await axiosInstance.get("/stories");
  return data;
};

export const getStoryById = async (id: string): Promise<Story> => {
  const { data } = await axiosInstance.get(`/stories/${id}`);
  return data;
};

export const createStory = async (storyData: Partial<Story>): Promise<Story> => {
  const { data } = await axiosInstance.post("/stories", storyData);
  return data;
};

export const updateStory = async (
  id: string,
  storyData: Partial<Story>
): Promise<Story> => {
  const { data } = await axiosInstance.put(`/stories/${id}`, storyData);
  return data;
};

export const deleteStory = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/stories/${id}`);
};
