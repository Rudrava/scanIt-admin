import { message } from "antd";
import axios from "axios";

export * from "./authReqs";
axios.defaults.baseURL =
    process.env.NODE_ENV === "developement"
        ? "http://localhost:3333"
        : "https://api.todo-app-react.vercel.app";
console.log();

axios.interceptors.request.use((config) => {
    return config;
});

// catch errors here
axios.interceptors.response.use(
    (res) => res,
    (error) => {
        message.error(error.response.data.message);
    }
);
