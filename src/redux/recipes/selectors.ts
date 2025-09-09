import type {RootState} from "../store.ts";

export const selectRecipes = (state:RootState)=> state.recipes.recipes
export const selectIsLoading = (state:RootState)=> state.recipes.isLoading