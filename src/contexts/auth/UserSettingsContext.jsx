import { useEffect, useState } from "react";
import { UserSettingsContext } from "./UserSettingsContext.js";
// import i18n from './localization/i18n.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../localization/i18n.js";
import { Alert } from "react-native";

export default function UserSettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        language: 'en',
        darkMode: false,
        notifications: false
    })

    useEffect(() => {
        const loadSettings = async () => {

            try {
                const savedSettings = await AsyncStorage.getItem('appSettings');

                if (savedSettings) {
                    const data = JSON.parse(savedSettings)

                    await i18n.changeLanguage(settings.language)
                    setSettings(data)
                }

            } catch (err) {

                Alert.alert(err.message)
            }
        }

        loadSettings()
    }, [])

    useEffect(() => {
        if (settings.language !== i18n.language) {
            i18n.changeLanguage(settings.language)
        }
    }, [settings.language])

    const saveSettings = async (userSettings) => {
        try {
            await AsyncStorage.setItem('appSettings', JSON.stringify(userSettings))

            setSettings(userSettings)
        } catch (err) {
            Alert.alert(err.message)
        }
    }


    const contextValues = {
        saveSettings,
        settings
    }

    return (
        <UserSettingsContext.Provider value={contextValues}>
            {children}
        </UserSettingsContext.Provider>
    );
}