import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../api";
import PageLoader from "../components/PageLoader";
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
    const [error] = React.useState(null);

    const { mutate } = useMutation(logoutAPI, {
        onSuccess: () => {
            localStorage.clear();
            navigate("/login", { replace: true });
        },
    });

    const logout = useCallback(() => {
        mutate();
    }, [navigate]);

    const login = useCallback(({ user, tokens }) => {
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", tokens.access.token);
        localStorage.setItem("refreshToken", tokens.refresh.token);
    }, []);

    useEffect(() => {
        setIsLoadingUser(true);
        const token = localStorage.getItem("accessToken");
        const user = JSON.parse(localStorage.getItem("user"));
        if (!!token && !!user) {
            setIsAuthenticated(true);
            setUser((e) => (!e ? user : e));
        } else {
            setIsLoadingUser(false);
            navigate("/login", { replace: true });
        }

        setIsLoadingUser(false);
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

    return isLoadingUser ? (
        <PageLoader />
    ) : (
        <AuthContext.Provider value={{ ...value }}>
            {children}
        </AuthContext.Provider>
    );
});

export const useAuth = () => React.useContext(AuthContext);

export default Auth;
