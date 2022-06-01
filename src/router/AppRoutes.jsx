import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../contexts/Auth";

const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Inventory = lazy(() => import("../Pages/Inventory"));
const Sell = lazy(() => import("../Pages/Sell"));
const FourOhFour = lazy(() => import("../components/FourOhFour"));
const AuthWrapper = lazy(() => import("../components/AuthWrapper"));

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AuthWrapper>
                        <Dashboard />
                    </AuthWrapper>
                }
            />
            <Route
                path="/inventory"
                element={
                    <AuthWrapper>
                        <Inventory />
                    </AuthWrapper>
                }
            />
            <Route
                path="/sell"
                element={
                    <AuthWrapper>
                        <Sell />
                    </AuthWrapper>
                }
            />
            <Route path="*" element={<FourOhFour />} />
        </Routes>
    );
};

export default AppRoutes;
