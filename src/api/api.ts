import axios from "axios";

export const instance = axios.create({
    baseURL: "https://personal-recipe-platform-back-end.onrender.com",
});
