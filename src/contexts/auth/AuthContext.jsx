import { useState } from "react";
import { AuthContext } from "./AuthContext.js";



export default function AuthContextProvider({ children }) {
    const [state, setState] = useState(null);

    const login = (userData) => {
        setState(userData)
    }

    const register = (userData) => {
        setState(userData)
    }

    const contextValues = {
        isAuthenticated: !!state,
        user: state,
        login,
        register
    }
    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
}