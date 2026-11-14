import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../../api/index.js";
import { Alert } from "react-native";

export default function AuthProvider({ children }) {
    const [state, setState] = useState(null);

    useEffect(() => {
        loadUser()
    }, [])

    const login = async (userData) => {
        await saveUser(userData);
    };

    const register = async (userData) => {
        await saveUser(userData);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('auth')
        setState(null);
    };

    const saveUser = async (data) => {
 
        const userInfo = {
            id: data.user.id,
            email: data.user.email,
            access_token: data.access_token,
            refresh_token: data.refresh_token
        };

        try {
            await AsyncStorage.setItem('auth', JSON.stringify(userInfo))
            setState(userInfo);

        } catch (error) {
            alert('Cannot save in storage!')
        }
    }

    const loadUser = async () => {
        const user = await AsyncStorage.getItem('auth');

        if (user) {
            return setState(JSON.parse(user))
        }

        return null
    }


    const contextValues = {
        isAuthenticated: !!state,
        user: state,
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