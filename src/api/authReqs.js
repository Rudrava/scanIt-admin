import axios from "axios";

/**
 *
 * @param Object
 *  {
 *  email: String,
 *  password: String
 *  }
 * @returns Promise
 */
export const login = async (values) => {
    return axios.post(`v1/auth/login`, values);
};
export const logout = async () => {
    return axios.post(`v1/auth/logout`, {
        refreshToken: localStorage.getItem("refreshToken"),
    });
};

/**
 *
 * @param Object
 *  {
 *  name: String,
 *  email: String,
 *  password: String
 *  }
 * @returns Promise
 */
export const signup = async (values) => {
    return axios.post(`v1/auth/register`, values);
};
