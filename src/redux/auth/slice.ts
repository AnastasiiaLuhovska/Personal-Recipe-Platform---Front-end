import {createSlice} from "@reduxjs/toolkit";
import {loginThunk, logoutThunk, signUpThunk} from "./operations.ts";
import type {InitialState} from "../../types/types.ts";


const initialState:InitialState = {
    error: null,
    isLoading: false,
    isLoggedIn: false
};
const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpThunk.fulfilled, (state) => {
                state.error = null;
                state.isLoading = false
            })
            .addCase(signUpThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signUpThunk.rejected, (state) => {
                state.error = false
                state.isLoading = false
            })
            .addCase(loginThunk.fulfilled, (state) => {
                state.error = null;
                state.isLoading = false
                state.isLoggedIn = true
            })
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginThunk.rejected, (state) => {
                state.error = false
                state.isLoading = false
                state.isLoggedIn = false
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.error = null;
                state.isLoading = false
                state.isLoggedIn = false
            })
            .addCase(logoutThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logoutThunk.rejected, (state) => {
                state.error = false
                state.isLoading = false
                state.isLoggedIn = true
            })
    }
});

export const authReducer = slice.reducer;
