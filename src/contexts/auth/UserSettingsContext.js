import { createContext } from "react";

export const UserSettingsContext = createContext({
    saveSettings() { },
    loadSettings() { },
    settings: {
        'language': 'en',
        'darkMode': false,
        'notifications': false
    }
})