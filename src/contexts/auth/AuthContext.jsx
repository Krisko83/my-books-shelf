import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
 import { authApi } from "../../api/index.js";
import { Alert } from "react-native";
import useSecureState from "../../hooks/useSecureState.js";


export default function AuthProvider({ children }) {
    const [auth, setAuth] = useSecureState('auth', null);

    console.log(auth);
 
    const login = async (userData) => {
        await saveUser(userData);
    };

    const register = async (userData) => {
        await saveUser(userData);
    };

    const logout = async () => {
         setAuth(null);
    };

    const saveUser = async (data) => {
 
        const userInfo = {
            id: data.user.id,
            email: data.user.email,
            access_token: data.access_token,
            refresh_token: data.refresh_token
        };

        // try {
        //     await AsyncStorage.setItem('auth', JSON.stringify(userInfo))

            setAuth(userInfo);

        // } catch (error) {
        //     alert('Cannot save in storage!')
        // }
    }

    // const loadUser = async () => {
    //     const user = await AsyncStorage.getItem('auth');

    //     if (user) {
    //         return setAuth(JSON.parse(user))
    //     }

    //     return null
    // }


    const contextValues = {
        isAuthenticated: !!auth,
        user: auth,
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