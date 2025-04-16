import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en';
import hi from './translations/hi';

// Initialize i18n
i18next
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en',
    resources: {
      en: {
        translation: en
      },
      hi: {
        translation: hi
      }
    },
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18next; 