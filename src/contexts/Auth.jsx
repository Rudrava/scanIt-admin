import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext({
    isAuthenticated: false,
    isLoadingUser: false,
    user: null,
    error: null,
    logout: () => {},
    login: () => {},
});

const Auth = memo(({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoadingUser, setIsLoadingUser] = React.useState(false);
    const [error, setError] = React.useState(null);

    const logout = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.clear();
        navigate("/login", { replace: true });
    }, [navigate]);

    const login = useCallback(({ user, tokens }) => {
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", tokens.access.token);
        localStorage.setItem("refreshToken", tokens.refresh.token);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(!!token);
        if (token) {
            setIsAuthenticated(true);
            setUser((e) => (!e ? user : e));
        }
    }, []);

    const value = useMemo(
        () => ({
            isLoadingUser,
            isAuthenticated,
            user,
            error,
            logout,
            login: login,
        }),
        [isLoadingUser, isAuthenticated, user, error, logout, login]
    );

    return (
        <AuthContext.Provider value={{ ...value }}>
            {children}
        </AuthContext.Provider>
    );
});

export const useAuth = () => React.useContext(AuthContext);

export default Auth;
