import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import storiesReducer from "@/store/slices/storiesSlice";
import travellersReducer from "@/store/slices/travellersSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        stories: storiesReducer,
        travellers: travellersReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export {default as TravellersStoriesItem} from "./TravellersStoriesItem/TravellersStoriesItem";
