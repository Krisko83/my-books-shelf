import { api } from "./api.js";

export async function getUserInfo(userId) {

    try {
        const response = await api.get(`/users?user_id=eq.${userId}`);
        console.log(response.data);

        return response.data;

    } catch (err) {
        throw new Error('Unable to retrive user info.Please try again later!')
    }
}

export async function uploadImage(image) {

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
    console.log('from userInfo',userId, data)
    try {
        const response = await api.patch(`/users?user_id=eq.${userId}`, data)

        return response.data
    } catch (err) {
        console.log(err.message);
        
        throw new Error('Info cannot be uploaded!')
    }
}