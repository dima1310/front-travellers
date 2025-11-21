import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {Story} from "@/types/story.types";

interface StoriesState {
    items: Story[];
    page: number;
    hasMore: boolean;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
}

const initialState: StoriesState = {
    items: [],
    page: 1,
    hasMore: true,
    status: "idle",
    error: null,
};

const storiesSlice = createSlice({
    name: "stories",
    initialState,
    reducers: {
        setStories(state, action: PayloadAction<Story[]>) {
            state.items = action.payload;
        },
        appendStories(state, action: PayloadAction<Story[]>) {
            state.items.push(...action.payload);
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setHasMore(state, action: PayloadAction<boolean>) {
            state.hasMore = action.payload;
        },
        setStatus(state, action: PayloadAction<StoriesState["status"]>) {
            state.status = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const {
    setStories,
    appendStories,
    setPage,
    setHasMore,
    setStatus,
    setError,
} = storiesSlice.actions;

export default storiesSlice.reducer;
