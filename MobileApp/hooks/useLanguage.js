import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../constants/i18n';
import * as Speech from 'expo-speech';

export default function useLanguage() {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  
  const changeLanguage = (language) => {
    // Stop any ongoing speech when language changes
    Speech.stop();
    
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };
  
  useEffect(() => {
    const handleLanguageChanged = () => {
      setCurrentLanguage(i18n.language);
      // Also stop speech when language changes programmatically
      Speech.stop();
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);
  
  return {
    t,
    currentLanguage,
    changeLanguage,
    isEnglish: currentLanguage === 'en',
    isHindi: currentLanguage === 'hi',
    languages: [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'हिंदी' }
    ]
  };
} 