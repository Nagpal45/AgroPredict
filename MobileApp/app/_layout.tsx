import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import '../constants/i18n'; // Import i18n setup
import { useTranslation } from 'react-i18next';

// Define theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',
    secondary: '#2E7D32',
  },
};

export default function TabLayout() {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <PaperProvider theme={theme}>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('home.appTitle'),
            tabBarLabel: t('home.welcome'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="crop"
          options={{
            title: t('crop.title'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="sprout" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="fertilizer"
          options={{
            title: t('fertilizer.title'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="flask" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="disease"
          options={{
            title: t('disease.title'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="leaf" size={size} color={color} />
            ),
          }}
        />
      <Tabs.Screen
        name="result"
        options={{
          title: t('result.title'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-box" size={size} color={color} />
          ),
        }}
      />
      </Tabs>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}
