import { use } from "react";
import { AuthContext, useAuthContext } from "../contexts/auth/AuthContext.js";
import { authenticationApi } from "./api.js"
import AsyncStorage from "@react-native-async-storage/async-storage";



export async function register(userData) {


    try {
        const response = await authenticationApi.post('/signup', userData);

        return response.data;

    } catch (err) {
        throw new Error('Unable to register user.Please try again later!')
    }
}

export async function login(userData) {

    try {
        const response = await authenticationApi.post('/token?grant_type=password', userData);

        return response.data;

    } catch (error) {
        throw new Error('Unable to login user.Please try again later!')
    }
}

export async function logout() {
    // const userData = await AsyncStorage.getItem('auth');
    // const user = userData ? JSON.parse(userData) : null

    try {
        await authenticationApi.post('logout')

    } catch (error) {
        console.log('Status:', error.response?.status);
        console.log('Data:', error.response?.data);

        throw new Error('Unable to logout user. Please try again later!')
    }
}