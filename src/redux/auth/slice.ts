import {createSlice} from "@reduxjs/toolkit";
import {loginThunk, logoutThunk, refreshThunk, signUpThunk} from "./operations.ts";
import type {InitialState} from "../../types/types.ts";
import toast from 'react-hot-toast';


const initialState:InitialState = {
    error: null,
    isLoading: false,
    isLoggedIn: false,
    isRefreshing:false
};
const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpThunk.fulfilled, (state) => {
                state.error = null;
                state.isLoading = false;
                toast.success('Registration is successful!');
            })
            .addCase(signUpThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signUpThunk.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
                toast.error(action.payload as string || 'Registration error');
            })
            .addCase(loginThunk.fulfilled, (state) => {
                state.error = null;
                state.isLoading = false
                state.isLoggedIn = true
            })
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
                state.isLoggedIn = false;
                toast.error(action.payload as string || 'Login error');
            })
            .addCase(logoutThunk.fulfilled, () => initialState
            )
            .addCase(logoutThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.error = action.payload as string
                state.isLoading = false
                state.isLoggedIn = true
            })
            .addCase(refreshThunk.fulfilled, (state) => {
                state.error = null;
                state.isRefreshing = false
                state.isLoggedIn = true
            })
            .addCase(refreshThunk.pending, (state) => {
                state.isRefreshing = true
            })
            .addCase(refreshThunk.rejected, (state, action) => {
                state.error = action.payload as string
                state.isRefreshing = false
                state.isLoggedIn = false
            })
    }
});

export const authReducer = slice.reducer;
