import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {AuthState, User} from "@/types/auth.types";

const initialState: AuthState = {
    user: null,
    token: null,
    isAuth: false,
    status: "idle",
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuth = true;
            state.error = null;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuth = false;
        },
        setStatus(state, action: PayloadAction<AuthState["status"]>) {
            state.status = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const {loginSuccess, logout, setStatus, setError} = authSlice.actions;
export default authSlice.reducer;
