import type { RootState } from "../index";

export const selectStories = (s: RootState) => s.stories.items;
export const selectStoriesPage = (s: RootState) => s.stories.page;
export const selectStoriesHasMore = (s: RootState) => s.stories.hasMore;
export const selectStoriesStatus = (s: RootState) => s.stories.status;
