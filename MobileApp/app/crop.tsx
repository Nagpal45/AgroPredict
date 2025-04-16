import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Title, useTheme, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import axios from 'axios';
import { API_BASE_URL } from './config';

// Base URL for the backend
const BASE_URL = 'http://192.168.1.3:5000';

export default function CropScreen() {
  const theme = useTheme();
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorous, setPhosphorous] = useState('');
  const [potassium, setPotassium] = useState('');
  const [ph, setPh] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!nitrogen || !phosphorous || !potassium || !ph || !rainfall || !city) {
      setError('All fields are required');
      return false;
    }
    
    if (isNaN(Number(nitrogen)) || isNaN(Number(phosphorous)) || 
        isNaN(Number(potassium)) || isNaN(Number(ph)) || isNaN(Number(rainfall))) {
      setError('Soil values must be numbers');
      return false;
    }
    
    return true;
  };

  const getCropRecommendation = async (data: {
  nitrogen: number;
  phosphorous: number;
  pottasium: number;
  ph: number;
  rainfall: number;
  city: string;
}) => {
  try {
    const formData = new FormData();
    formData.append('nitrogen', data.nitrogen.toString());
    formData.append('phosphorous', data.phosphorous.toString());
    formData.append('pottasium', data.pottasium.toString());
    formData.append('ph', data.ph.toString());
    formData.append('rainfall', data.rainfall.toString());
    formData.append('city', data.city);

    const response = await axios.post(`${API_BASE_URL}/api/crop-predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting crop recommendation:', error);
    throw error;
  }
};

  const handleSubmit = async () => {
    try {
      setError('');
      
      if (!validateInputs()) {
        return;
      }
      
      setLoading(true);
      
      const data = {
        nitrogen: Number(nitrogen),
        phosphorous: Number(phosphorous),
        pottasium: Number(potassium),
        ph: Number(ph),
        rainfall: Number(rainfall),
        city: city
      };
      
      const response = await getCropRecommendation(data);    
      
      // Navigate to result page with data
      router.navigate({
        pathname: "/result",
        params: { 
          type: 'crop',
          data: JSON.stringify({
            prediction: response.crop,
            nitrogen: data.nitrogen,
            phosphorous: data.phosphorous,
            potassium: data.pottasium,
            ph: data.ph,
            rainfall: data.rainfall,
            city: data.city
          })
        }
      });
    } catch (error) {
      console.error('Error getting crop recommendation:', error);
      Alert.alert('Error', 'Failed to get recommendation. Please try again.');
      setError('Failed to get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Crop Recommendation</Title>
        <Text style={styles.subtitle}>
          Enter soil and location details to get personalized crop recommendations
        </Text>

        <TextInput
          label="Nitrogen (N)"
          value={nitrogen}
          onChangeText={setNitrogen}
          style={styles.input}
          keyboardType="numeric"
          mode="outlined"
        />
        
        <TextInput
          label="Phosphorous (P)"
          value={phosphorous}
          onChangeText={setPhosphorous}
          style={styles.input}
          keyboardType="numeric"
          mode="outlined"
        />
        
        <TextInput
          label="Potassium (K)"
          value={potassium}
          onChangeText={setPotassium}
          style={styles.input}
          keyboardType="numeric"
          mode="outlined"
        />
        
        <TextInput
          label="pH Value"
          value={ph}
          onChangeText={setPh}
          style={styles.input}
          keyboardType="numeric"
          mode="outlined"
        />
        
        <TextInput
          label="Rainfall (mm)"
          value={rainfall}
          onChangeText={setRainfall}
          style={styles.input}
          keyboardType="numeric"
          mode="outlined"
        />
        
        <TextInput
          label="City (for weather data)"
          value={city}
          onChangeText={setCity}
          style={styles.input}
          mode="outlined"
        />

        {error ? <HelperText type="error">{error}</HelperText> : null}
        
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          loading={loading}
          disabled={loading}
        >
          Get Recommendation
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    paddingVertical: 6,
  },
}); 