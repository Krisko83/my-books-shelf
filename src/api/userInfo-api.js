import { uuid } from "expo";
import { api, storageApi } from "./api.js";

export async function getUserInfo(userId) {

    try {
        const response = await api.get(`/users?user_id=eq.${userId}`);


        return response.data;

    } catch (err) {
        throw new Error('Unable to retrive user info.Please try again later!')
    }
}

export async function createUserInfo(data) {

    try {
        const response = await api.post('/users', data)

        return response.data
    } catch (err) {
        throw new Error('Info cannot be uploaded!')
    }
}

export async function updateUserInfo(userId, data) {

    try {
        const response = await api.patch(`/users?user_id=eq.${userId}`, data)

        return response.data
    } catch (err) {

        throw new Error('Info cannot be uploaded! Try again later!')
    }
}

export async function uploadImage(fileName, arrayBuffer) {
    try {
        const response = await storageApi.post(`/avatars/${fileName}`, arrayBuffer, {
            headers: {
                'Content-Type': 'image/jpeg',
                'x-upsert': 'true'
            }
        });

        return response.data;
    } catch (err) {
        //      console.log('Status:', err.response?.status);
        // console.log('Supabase error:', err.response?.data);
        throw new Error('Image cannot be uploaded! Try again later!')
    }
}