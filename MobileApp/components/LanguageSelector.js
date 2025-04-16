import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import useLanguage from '../hooks/useLanguage';

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  return (
    <View style={styles.container}>
      {languages.map(language => (
        <TouchableOpacity
          key={language.code}
          style={[
            styles.languageButton,
            currentLanguage === language.code && styles.activeLanguage
          ]}
          onPress={() => changeLanguage(language.code)}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage === language.code && styles.activeLanguageText
            ]}
          >
            {language.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2E7D32',
  },
  activeLanguage: {
    backgroundColor: '#2E7D32',
  },
  languageText: {
    color: '#2E7D32',
    fontWeight: '500',
  },
  activeLanguageText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 