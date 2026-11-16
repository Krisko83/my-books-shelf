import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";

export default function useSecureState(key, initialValues) {

    const [state, setState] = useState(initialValues);

    
    useEffect(() => {
        const loadState = async () => {

            try {
                const storedState = await SecureStore.getItemAsync(key);

                if (storedState !== null) {
                    setState(JSON.parse(storedState))
                }
            } catch (err) {
                Alert.alert("Failed to load state from SecureStore", err.message)
            }

        }
        loadState()
    }, [key]);


    useEffect(() => {
        const saveState = async () => {

            try {
                await SecureStore.setItemAsync(key, JSON.stringify(state))

            } catch (error) {
                Alert.alert("Failed to save state to SecureStore", error);
            }

        }

        saveState()

    }, [key, state]);


    return [state, setState]
}


