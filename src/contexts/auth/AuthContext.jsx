import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthProvider({ children }) {
    const [state, setState] = useState(null);

    useEffect(() => {
        loadUser()
    }, [])

    const login = async (userData) => {
       await saveUser(userData)
    };

    const register = async (userData) => {
       await saveUser(userData)
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('auth')
            setState(null);

        } catch (error) {
            alert(error.message)
        }
    };

    const saveUser = async (data) => {
        try {
            await AsyncStorage.setItem('auth', JSON.stringify(data))
            setState(data);

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