import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext({
    isAuthenticated: false,
    isLoadingUser: false,
    user: null,
    error: null,
    logout: () => {},
    login: () => {},
});

const Auth = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [isLoadingUser, setIsLoadingUser] = React.useState(false);
    const [error, setError] = React.useState(null);

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.clear();
        navigate("/login", { replace: true });
    };

    const login = ({ user, tokens }) => {
        console.log("here");
        console.log(user, tokens);
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", token.access.token);
        localStorage.setItem("refreshToken", token.refresh.token);
        // navigate("/");
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        console.log("==========USER===========", localStorage.getItem("user"));
        const user = JSON.parse(localStorage.getItem("user"));
        if (token) {
            setIsAuthenticated(true);
            setUser(user);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoadingUser,
                isAuthenticated,
                user,
                error,
                logout,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);

export default Auth;
