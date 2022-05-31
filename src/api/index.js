import { message } from "antd";
import axios from "axios";

export * from "./authReqs";

axios.interceptors.request.use((config) => {
    config.baseURL = "http://localhost:3333/";
    return config;
});

// catch errors here
axios.interceptors.response.use(
    (res) => res,
    (error) => {
        message.error(error.response.data.message);
    }
);
