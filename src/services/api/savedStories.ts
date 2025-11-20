import { api } from "@/services/api/axiosConfig";

export async function addSavedStory(storyId: string) {
  await api.post(`/users/saved-story/${storyId}`);
}

export async function removeSavedStory(storyId: string) {
  await api.delete(`/users/saved-story/${storyId}`);
}
