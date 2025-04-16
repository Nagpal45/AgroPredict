import { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';
import { useTranslation } from 'react-i18next';
import useLanguage from './useLanguage';

export default function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const { currentLanguage } = useLanguage();
  
  // Load available voices when the component mounts
  useEffect(() => {
    const loadVoices = async () => {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        setAvailableVoices(voices);
      } catch (error) {
        console.error('Error loading voices:', error);
      }
    };
    
    loadVoices();
    
    // Clean up speech when component unmounts
    return () => {
      if (isSpeaking) {
        Speech.stop();
      }
    };
  }, []);
  
  // Get the best voice for the current language
  const getBestVoice = () => {
    if (availableVoices.length === 0) return null;
    
    // Language codes for our supported languages
    const langCode = currentLanguage === 'en' ? 'en' : 'hi';
    
    // Try to find a voice matching our language
    const matchingVoices = availableVoices.filter(voice => 
      voice.language && voice.language.startsWith(langCode)
    );
    
    if (matchingVoices.length > 0) {
      // Prefer female voices if available (they're often clearer)
      const femaleVoice = matchingVoices.find(voice => voice.quality === 'Enhanced' && voice.gender === 'female');
      if (femaleVoice) return femaleVoice.identifier;
      
      // Otherwise return the first matching voice
      return matchingVoices[0].identifier;
    }
    
    // If no matching voice found, return the default voice
    return null;
  };
  
  const speak = async (text) => {
    if (isSpeaking) {
      await Speech.stop();
    }
    
    setIsSpeaking(true);
    
    const options = {
      language: currentLanguage === 'en' ? 'en-US' : 'hi-IN',
      pitch: 1.0,
      rate: 0.9, // Slightly slower for better comprehension
      voice: getBestVoice(),
    };
    
    try {
      await Speech.speak(text, {
        ...options,
        onDone: () => setIsSpeaking(false),
        onError: (error) => {
          console.error('Speech error:', error);
          setIsSpeaking(false);
        },
      });
    } catch (error) {
      console.error('Error speaking:', error);
      setIsSpeaking(false);
    }
  };
  
  const stop = async () => {
    if (isSpeaking) {
      await Speech.stop();
      setIsSpeaking(false);
    }
  };
  
  return {
    speak,
    stop,
    isSpeaking
  };
} 