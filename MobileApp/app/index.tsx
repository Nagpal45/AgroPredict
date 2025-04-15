import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>AgroPredict Mobile</Title>
        <Text style={styles.subtitle}>Agriculture Assistant for Smart Farming</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Welcome to AgroPredict</Title>
          <Text style={styles.cardText}>
            This app helps farmers make better decisions using data-driven recommendations.
            Use the tabs below to access different features.
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Features</Title>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Crop Recommendation</Text>
            <Text style={styles.featureDescription}>
              Get recommendations for the best crops to plant based on soil and weather conditions.
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Fertilizer Recommendation</Text>
            <Text style={styles.featureDescription}>
              Find the optimal fertilizer based on your soil conditions and crop type.
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Plant Disease Detection</Text>
            <Text style={styles.featureDescription}>
              Detect plant diseases by uploading images of affected plants.
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>How to Use</Title>
          <Text style={styles.cardText}>
            1. Navigate using the bottom tabs
          </Text>
          <Text style={styles.cardText}>
            2. Enter required information or upload images
          </Text>
          <Text style={styles.cardText}>
            3. View results and recommendations
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    color: '#2E7D32',
    marginBottom: 10,
  },
  cardText: {
    marginBottom: 8,
  },
  featureItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featureTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  featureDescription: {
    color: '#666',
  },
}); 