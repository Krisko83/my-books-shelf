import 'intl-pluralrules';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import bg from './languages/bg.json';
import en from './languages/en.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            bg: { translation: bg },

        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

    export default i18n;