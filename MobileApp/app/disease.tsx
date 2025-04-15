import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Button, Text, Title, useTheme, ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// Base URL for the backend
const BASE_URL = 'http://192.168.1.100:5000';

export default function DiseaseScreen() {
  const theme = useTheme();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const detectDisease = async (imageUri) => {
    try {
      const formData = new FormData();
      
      // Get the file name from the URI
      const uriParts = imageUri.split('/');
      const fileName = uriParts[uriParts.length - 1];
      
      // Append the image to the form data
      formData.append('file', {
        uri: imageUri,
        name: fileName,
        type: 'image/jpeg', // Adjust this based on your image type
      });

      const response = await axios.post(`${BASE_URL}/disease-predict`, formData, {
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Plant Disease Detection</Title>
        <Text style={styles.subtitle}>
          Upload or take a photo of a plant leaf to detect diseases
        </Text>

        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No image selected</Text>
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
            Pick Image
          </Button>
          
          <Button
            mode="outlined"
            onPress={takePhoto}
            style={styles.button}
            icon="camera"
            disabled={loading}
          >
            Take Photo
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
            Analyze Plant
          </Button>
        )}
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
}); 