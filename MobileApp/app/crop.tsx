import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Title, useTheme, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import axios from 'axios';
import { API_BASE_URL } from './config';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import SpeechButton from '../components/SpeechButton';
import usePageContent from '../hooks/usePageContent';

export default function CropScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorous, setPhosphorous] = useState('');
  const [potassium, setPotassium] = useState('');
  const [ph, setPh] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { getContent } = usePageContent({ pageName: 'crop' });

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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LanguageSelector />
        <View style={styles.content}>
          <Title style={styles.title}>{t('crop.title')}</Title>
          <Text style={styles.subtitle}>
            {t('crop.description')}
          </Text>

          <TextInput
            label={t('crop.inputLabels.nitrogen')}
            value={nitrogen}
            onChangeText={setNitrogen}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
          />
          
          <TextInput
            label={t('crop.inputLabels.phosphorus')}
            value={phosphorous}
            onChangeText={setPhosphorous}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
          />
          
          <TextInput
            label={t('crop.inputLabels.potassium')}
            value={potassium}
            onChangeText={setPotassium}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
          />
          
          <TextInput
            label={t('crop.inputLabels.ph')}
            value={ph}
            onChangeText={setPh}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
          />
          
          <TextInput
            label={t('crop.inputLabels.rainfall')}
            value={rainfall}
            onChangeText={setRainfall}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
          />
          
          <TextInput
            label={t('crop.inputLabels.city')}
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
            {t('crop.getRecommendation')}
          </Button>
        </View>
        
        {/* Add padding at the bottom to avoid content being hidden behind the speech button */}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {/* Place the speech button outside the ScrollView so it's always visible */}
      <SpeechButton pageContent={getContent()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
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
  bottomPadding: {
    height: 80, // Provide space at the bottom so content isn't hidden behind the button
  },
}); 