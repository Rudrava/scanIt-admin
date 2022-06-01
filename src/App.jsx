import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import PageLoader from "./components/PageLoader";
const AuthRoutes = lazy(() => import("./router/AuthRoutes"));
const AppRoutes = lazy(() => import("./router/AppRoutes"));
const Auth = lazy(() => import("./contexts/Auth"));

const queryClient = new QueryClient();
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                    <Auth>
                        <AuthRoutes />
                        <AppRoutes />
                    </Auth>
                </Suspense>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
