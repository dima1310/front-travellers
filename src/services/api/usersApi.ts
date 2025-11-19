// import { api } from "@/lib/axios";

// export const usersApi = {
//   list: async () => {
//     const { data } = await api.get("/users");
//     return data.data;
//   },

//   current: async () => {
//     const { data } = await api.get("/users/current");
//     return data.data;
//   },

//   getById: async (userId: string) => {
//     const { data } = await api.get(`/users/${userId}`);
//     return data.data;
//   },

//   update: async (payload: Record<string, unknown>) => {
//     const { data } = await api.patch("/users/update", payload);
//     return data;
//   },

//   uploadAvatar: async (formData: FormData) => {
//     const { data } = await api.patch("/users/avatar", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return data;
//   },

//   addSavedStory: async (storyId: string) => {
//     const { data } = await api.post(`/users/saved-story/${storyId}`);
//     return data;
//   },

//   removeSavedStory: async (storyId: string) => {
//     const { data } = await api.delete(`/users/saved-story/${storyId}`);
//     return data;
//   },
// };
