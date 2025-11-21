import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {Traveller} from "@/types/traveller.types";

interface TravellersState {
    items: Traveller[];
    visible: number; // для "Переглянути всіх"
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
}

const initialState: TravellersState = {
    items: [],
    visible: 4,
    status: "idle",
    error: null,
};

const travellersSlice = createSlice({
    name: "travellers",
    initialState,
    reducers: {
        setTravellers(state, action: PayloadAction<Traveller[]>) {
            state.items = action.payload;
        },
        showMore(state, action: PayloadAction<number | undefined>) {
            state.visible += action.payload ?? 3;
        },
        setStatus(state, action: PayloadAction<TravellersState["status"]>) {
            state.status = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const {setTravellers, showMore, setStatus, setError} =
    travellersSlice.actions;

export default travellersSlice.reducer;
