import {createSlice} from "@reduxjs/toolkit";
import type {AddRecipeFormValues} from "../../types/types.ts";
import {searchRecipesThunk, addRecipeThunk, getRecipeById} from "./operations.ts";
import {logoutThunk} from "../auth/operations.ts";


const initialState:AddRecipeFormValues = {
    error: null,
    isLoading: false,
    recipes:[],
    recipe: {
        _id: '',
        name: '',
        description: '',
        cookTime: 0,
        servings: 0,
        difficulty: 'Medium',
        ingredients:[],
        instructions: ''
    }
};
const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchRecipesThunk.fulfilled, (state, action) => {
            state.error = null;
            state.isLoading = false
            state.recipes = action.payload
        })
            .addCase(searchRecipesThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(searchRecipesThunk.rejected, (state, action) => {
                state.error = action.payload as string
                state.isLoading = false
            })
            .addCase(addRecipeThunk.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                state.recipes.push(action.payload);
            })
            .addCase(addRecipeThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRecipeThunk.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
            })
            .addCase(logoutThunk.fulfilled, () => initialState
            )
            .addCase(getRecipeById.fulfilled, (state, action) => {
                state.recipe = action.payload
                state.error = null
                state.isLoading = false
            })
            .addCase(getRecipeById.pending, (state) => {
                state.isLoading = true

            })
            .addCase(getRecipeById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string;

            })
    }
});

export const recipesReducer = slice.reducer;
