import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../api/api.ts";
import type {LoginFormValues, RegisterFormValues} from "../../types/types.ts";
import {AxiosError} from "axios";

const addToken = (token:string) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

};

export const signUpThunk  = createAsyncThunk("signUp", async (userData:RegisterFormValues, thunkAPI) => {
    try {
        await instance.post("/auth/register", userData);
        const { email, password } = userData;
        thunkAPI.dispatch(
            loginThunk({ email, password }),
        );

    } catch (error) {
        if (error instanceof AxiosError){
            return thunkAPI.rejectWithValue(error.response?.data.message);
        }
        return thunkAPI.rejectWithValue('Register is failed');
    }
});

export const loginThunk = createAsyncThunk('login', async(userData:LoginFormValues, thunkAPI)=>{
   try {
        const {data} = await instance.post('/auth/login', userData)
       addToken(data.accessToken)
        return {
            email: userData.email
       }
    }catch (error) {
       console.log(error)
       if (error instanceof AxiosError){
           return thunkAPI.rejectWithValue(error.response?.data.message);
       }
       return thunkAPI.rejectWithValue('Login is failed');
   }
})

 export const logoutThunk =  createAsyncThunk('logout', async(_, thunkAPI)=> {
     try {
         await instance.post('/auth/logout')
         addToken("")

     } catch (error) {
         if (error instanceof AxiosError) {
             return thunkAPI.rejectWithValue(error.response?.data.message);
         }
         return thunkAPI.rejectWithValue('Logout is failed');
     }
 })

export const refreshThunk =  createAsyncThunk('refresh', async(_, thunkAPI)=> {
    try {
         const {data } = await instance.post('/auth/refresh')
         addToken(data.accessToken)
         return data
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('Refresh is failed');
    }
})