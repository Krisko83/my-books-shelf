import { getErrorMessage } from "../utils/error.utils.js";
import { authenticationApi } from "./api.js"


export async function register(userData) {


    try {
        const response = await authenticationApi.post('/signup', userData);

        return response.data;

    } catch (err) {
        throw new Error(getErrorMessage(err))
    }
}

export async function login(userData) {

    try {
        const response = await authenticationApi.post('/token?grant_type=password', userData);

        return response.data;

    } catch (err) {
        throw new Error(getErrorMessage(err))
    }
}

export async function logout() {
    // const userData = await AsyncStorage.getItem('auth');
    // const user = userData ? JSON.parse(userData) : null

    try {
        await authenticationApi.post('logout')

    } catch (error) {
        // console.log('Status:', error.response?.status);
        // console.log('Data:', error.response?.data);

        throw new Error(getErrorMessage(err))
    }
}