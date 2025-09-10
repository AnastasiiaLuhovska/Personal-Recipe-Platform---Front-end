import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "./auth/slice.ts";
import {recipesReducer} from "./recipes/slice.ts";
import {
    persistStore,
    persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["isLoggedIn"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

 const store = configureStore({
    reducer:{
        auth: persistedReducer,
        recipes: recipesReducer
    }
})

export default store

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;