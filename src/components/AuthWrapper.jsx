import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts";

function AuthWrappper({ children }) {
    let { user, isLoadingUser, isAuthenticated } = useAuth();
    let location = useLocation();

    if (isLoadingUser && !(isAuthenticated && user)) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default AuthWrappper;
