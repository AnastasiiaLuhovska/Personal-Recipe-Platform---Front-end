import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "./auth/slice.ts";
import {recipesReducer} from "./recipes/slice.ts";


 const store = configureStore({
    reducer:{
        auth: authReducer,
        recipes: recipesReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;