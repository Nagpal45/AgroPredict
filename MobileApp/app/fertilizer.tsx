import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Title, useTheme, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import axios from 'axios';
import { API_BASE_URL } from './config';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

export default function FertilizerScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [cropName, setCropName] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorous, setPhosphorous] = useState('');
  const [potassium, setPotassium] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!cropName || !nitrogen || !phosphorous || !potassium) {
      setError('All fields are required');
      return false;
    }
    
    if (isNaN(Number(nitrogen)) || isNaN(Number(phosphorous)) || isNaN(Number(potassium))) {
      setError('Soil values must be numbers');
      return false;
    }
    
    return true;
  };

  const getFertilizerRecommendation = async (data: {
    cropname: string;
    nitrogen: number;
    phosphorous: number;
    pottasium: number;
  }) => {
    try {
      const formData = new FormData();
      formData.append('cropname', data.cropname);
      formData.append('nitrogen', data.nitrogen.toString());
      formData.append('phosphorous', data.phosphorous.toString());
      formData.append('pottasium', data.pottasium.toString());
  
      const response = await axios.post(`${API_BASE_URL}/api/fertilizer-predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting fertilizer recommendation:', error);
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
        cropname: cropName.toLowerCase(),
        nitrogen: Number(nitrogen),
        phosphorous: Number(phosphorous),
        pottasium: Number(potassium)
      };
      
      const response = await getFertilizerRecommendation(data);
      
      // Navigate to result page with data
      router.navigate({
        pathname: "/result",
        params: { 
          type: 'fertilizer',
          data: JSON.stringify({
            recommendation: response.recommendation,
            crop: cropName,
            nitrogen: nitrogen,
            phosphorous: phosphorous,
            potassium: potassium
          })
        }
      });
    } catch (error) {
      console.error('Error getting fertilizer recommendation:', error);
      Alert.alert('Error', 'Failed to get recommendation. Please try again.');
      setError('Failed to get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LanguageSelector />
      <View style={styles.content}>
        <Title style={styles.title}>{t('fertilizer.title')}</Title>
        <Text style={styles.subtitle}>
          {t('fertilizer.description')}
        </Text>

        <TextInput
          label={t('fertilizer.inputLabels.cropType')}
          value={cropName}
          onChangeText={setCropName}
          style={styles.input}
          mode="outlined"
          placeholder="e.g., rice, maize, apple"
        />
        
        <TextInput
          label={t('fertilizer.inputLabels.nitrogen')}
          value={nitrogen}
          onChangeText={setNitrogen}
          style={styles.input}
          keyboardType="numeric"
          mode="outlined"
        />
        
        <TextInput
          label={t('fertilizer.inputLabels.phosphorus')}
          value={phosphorous}
          onChangeText={setPhosphorous}
          style={styles.input}
          keyboardType="numeric"
          mode="outlined"
        />
        
        <TextInput
          label={t('fertilizer.inputLabels.potassium')}
          value={potassium}
          onChangeText={setPotassium}
          style={styles.input}
          keyboardType="numeric"
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
          {t('fertilizer.getRecommendation')}
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