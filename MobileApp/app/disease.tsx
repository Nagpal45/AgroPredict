import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Button, Text, Title, useTheme, ActivityIndicator, Card } from 'react-native-paper';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_BASE_URL } from './config';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import SpeechButton from '../components/SpeechButton';
import usePageContent from '../hooks/usePageContent';
import useLanguage from '../hooks/useLanguage';

export default function DiseaseScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { getContent } = usePageContent({ pageName: 'disease' });

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera roll permissions to make this work!'
      );
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Request permission to access the camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera permissions to make this work!'
      );
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const detectDisease = async (imageUri: string) => {
    try {
      const formData = new FormData();
      
      // Get the file name from the URI
      const uriParts = imageUri.split('/');
      const fileName = uriParts[uriParts.length - 1];
      
      // Correctly append the image file to the form data
      formData.append('file', {
        uri: imageUri,
        name: fileName,
        type: 'image/jpeg'
      } as any);
      
      // Add the current language parameter
      formData.append('language', currentLanguage);
  
      const response = await axios.post(`${API_BASE_URL}/api/disease-predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error detecting disease:', error);
      throw error;
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setLoading(true);

    try {
      const response = await detectDisease(image);
      
      // Navigate to result page with data
      router.navigate({
        pathname: "/result",
        params: { 
          type: 'disease',
          data: JSON.stringify(response)
        }
      });
    } catch (error) {
      console.error('Error detecting disease:', error);
      Alert.alert(
        'Error',
        'Failed to analyze the image. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LanguageSelector />
        <View style={styles.content}>
          <Title style={styles.title}>{t('disease.title')}</Title>
          <Text style={styles.subtitle}>
            {t('disease.description')}
          </Text>

          <View style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>{t('disease.instructions')}</Text>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={pickImage}
              style={styles.button}
              icon="image"
              disabled={loading}
            >
              {t('disease.uploadImage')}
            </Button>
            
            <Button
              mode="outlined"
              onPress={takePhoto}
              style={styles.button}
              icon="camera"
              disabled={loading}
            >
              {t('disease.takePhoto')}
            </Button>
          </View>

          {loading ? (
            <ActivityIndicator animating={true} color={theme.colors.primary} size="large" style={styles.loader} />
          ) : (
            <Button
              mode="contained"
              onPress={analyzeImage}
              style={[styles.analyzeButton, { backgroundColor: theme.colors.primary }]}
              disabled={!image || loading}
            >
              {t('disease.analyze')}
            </Button>
          )}
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
  imageContainer: {
    width: '100%',
    height: 250,
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: '48%',
  },
  analyzeButton: {
    marginTop: 10,
    paddingVertical: 6,
  },
  loader: {
    marginTop: 20,
  },
  bottomPadding: {
    height: 80, // Provide space at the bottom so content isn't hidden behind the button
  },
}); 