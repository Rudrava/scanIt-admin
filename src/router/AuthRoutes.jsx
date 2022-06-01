import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../Pages/Login"));
const SignUp = lazy(() => import("../Pages/SignUp"));

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
};

export default AuthRoutes;
