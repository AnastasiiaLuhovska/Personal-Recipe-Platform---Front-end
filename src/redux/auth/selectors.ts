import type {RootState} from "../store.ts";

export const selectIsLoading = (state: RootState)=> state.auth.isLoading
export const selectIsLoggedIn = (state: RootState)=> state.auth.isLoggedIn

export const selectIsRefreshing = (state: RootState)=> state.auth.isRefreshing