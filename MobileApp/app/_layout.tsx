import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

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
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="crop"
          options={{
            title: 'Crop',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="sprout" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="fertilizer"
          options={{
            title: 'Fertilizer',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="flask" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="disease"
          options={{
            title: 'Disease',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="leaf" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
