import { createContext, use } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login() {},
    register() {},
    logout() {}
});

export const useAuthContext = () => {
    const context = use(AuthContext);

    if(!context) {
        throw new Error('useAuthontext must be used within a AuthProvider!')
    }

    return context;
};
