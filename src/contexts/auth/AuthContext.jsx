import { AuthContext } from "./AuthContext.js";
import useSecureAuth from "../../hooks/useSecureState.js";

export default function AuthProvider({ children }) {
    const [user, saveUser, removeUser] = useSecureAuth('auth', null)

    const login = async (userData) => {
        await saveUser(userData);
    };

    const register = async (userData) => {
        await saveUser(userData);
    };

    const logout = async () => {
        await removeUser();
    };


    const contextValues = {
        isAuthenticated: !!user,
        user,
        login,
        register,
        logout
    };


    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};