import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthWrappper from "./components/AuthWrapper";
import FourOhFour from "./components/FourOhFour";
import PageLoader from "./components/PageLoader";
const Auth = lazy(() => import("./contexts/Auth"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Inventory = lazy(() => import("./Pages/Inventory"));
const Login = lazy(() => import("./Pages/Login"));
const SignUp = lazy(() => import("./Pages/Signup"));
const Sell = lazy(() => import("./Pages/Sell"));

const queryClient = new QueryClient({});
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                    <Auth>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <AuthWrappper>
                                        <Dashboard />
                                    </AuthWrappper>
                                }
                            />
                            <Route
                                path="/inventory"
                                element={
                                    <AuthWrappper>
                                        <Inventory />
                                    </AuthWrappper>
                                }
                            />
                            <Route
                                path="/sell"
                                element={
                                    <AuthWrappper>
                                        <Sell />
                                    </AuthWrappper>
                                }
                            />
                            <Route path="*" element={<FourOhFour />} />
                        </Routes>
                    </Auth>
                </Suspense>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
