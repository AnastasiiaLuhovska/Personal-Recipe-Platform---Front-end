import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../api/api.ts";
import type {Recipe} from "../../types/types.ts";

export const searchRecipesThunk = createAsyncThunk(
    'recipes/search',
    async (searchTerm: string, thunkAPI) => {
        try {
            const params = searchTerm ? {name: searchTerm} : {};
            const {data} = await instance.get('/recipes', {params});
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch recipes');
        }
    }
);

export const addRecipeThunk = createAsyncThunk(
    'recipes/add',
    async (recipeData: Recipe, thunkAPI) => {
        try {
            const {data} = await instance.post('/recipes', recipeData);
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to add recipe');
        }
    }
);


export const getRecipeById = createAsyncThunk('recipes/getById', async (recipeId: string, thunkAPI) => {
    try{
        const {data} = await instance.get(`/recipes/${recipeId}`)

        return data.recipe
    }catch (error) {
        return thunkAPI.rejectWithValue('Failed to get recipe');
    }
})