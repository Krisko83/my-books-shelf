import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";

export default function useSecureAuth(key, initialValues) {
    const [state, setState] = useState(initialValues);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        loadUser()
    }, []);


    const saveUser = async (data) => {

        const userInfo = {
            id: data.user.id,
            email: data.user.email,
            access_token: data.access_token,
            refresh_token: data.refresh_token
        };

        try {
            await SecureStore.setItemAsync(key, JSON.stringify(userInfo))

            setState(userInfo);

        } catch (error) {
            alert('Cannot save in storage!')
        }
    }

    const loadUser = async () => {

        try {
            setLoading(true)
            const user = await SecureStore.getItemAsync(key);

            if (user !== null) {
                return setState(JSON.parse(user))
            }

            return null
        } catch (err) {
            Alert.alert(err.message)
        } finally {
            setLoading(false)

        }
    }

    const removeUser = async () => {

        try {
            await SecureStore.deleteItemAsync(key)
            setState(null)

        } catch (error) {
            alert('Cannot save in storage!')
        }
    }

    return [state, saveUser, removeUser]
}


