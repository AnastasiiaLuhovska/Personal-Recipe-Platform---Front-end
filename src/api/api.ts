import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,

});
//    baseURL: "https://personal-recipe-platform-back-end.onrender.com",