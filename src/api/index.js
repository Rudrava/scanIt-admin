import { message } from "antd";
import axios from "axios";

export * from "./authReqs";
axios.defaults.baseURL =
    process.env.NODE_ENV === "developement"
        ? "http://localhost:3333"
        : "https://scanit-api-demo-1.herokuapp.com";
console.log();

axios.interceptors.request.use((config) => {
    return config;
});

// catch errors here
axios.interceptors.response.use(
    (res) => (res.status === 204 ? { status: true } : res),
    (error) => {
        message.error(error.response.data.message);
    }
);
