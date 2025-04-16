import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTextToSpeech from '../hooks/useTextToSpeech';
import { useTranslation } from 'react-i18next';

interface SpeechButtonProps {
  // The content to be read aloud
  pageContent: string;
  // Optional custom styling for the button
  style?: object;
  // Optional size for the icon
  size?: number;
  // Optional position (fixed at bottom or inline)
  position?: 'fixed' | 'inline';
}

export default function SpeechButton({ 
  pageContent, 
  style = {},
  size = 28,
  position = 'fixed'
}: SpeechButtonProps) {
  const { speak, stop, isSpeaking } = useTextToSpeech();
  const { t } = useTranslation();
  
  // Handle the press event
  const handlePress = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(pageContent);
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);
  
  // Determine the container style based on position prop
  const containerStyle = position === 'fixed' 
    ? styles.fixedContainer 
    : styles.inlineContainer;
  
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={handlePress}
        accessibilityLabel={isSpeaking ? t('common.stopReading') : t('common.readAloud')}
        accessibilityRole="button"
      >
        <MaterialCommunityIcons 
          name={isSpeaking ? "volume-off" : "volume-high"} 
          size={size} 
          color="#fff" 
        />
        {position === 'fixed' && (
          <Text style={styles.buttonText}>
            {isSpeaking ? t('common.stopReading') : t('common.readAloud')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
    elevation: 5, // For Android
  },
  inlineContainer: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  }
}); 