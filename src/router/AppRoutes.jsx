import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Inventory = lazy(() => import("../Pages/Inventory"));
const Sell = lazy(() => import("../Pages/Sell"));
const FourOhFour = lazy(() => import("../components/FourOhFour"));
const AuthWrapper = lazy(() => import("../components/AuthWrapper"));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="*" element={<FourOhFour />} />
        </Routes>
    );
};

export default AppRoutes;
