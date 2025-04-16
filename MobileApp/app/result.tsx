import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Text, Button, useTheme } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

interface ResultData {
  prediction: string;
  nitrogen: number;
  phosphorous: number;
  potassium: number;
  ph: number;
  rainfall: number;
  city: string;
  recommendation: string;
  crop: string;
  disease: string;
}

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const [resultData, setResultData] = useState<ResultData | null>(null);

  useEffect(() => {
    if (params.data) {
      try {
        const parsedData = JSON.parse(
          Array.isArray(params.data) ? params.data[0] : params.data
        );
        setResultData(parsedData);
      } catch (error) {
        console.error('Error parsing data:', error);
      }
    }
  }, [params.data]);

  const renderCropResult = () => {
    return (
      <View>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.resultTitle}>{t('result.recommendationTitle')}</Title>
            <Text style={styles.resultValue}>{resultData?.prediction || 'Not available'}</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.description}>
              Based on your soil conditions and the weather in your area, we recommend
              planting {resultData?.prediction || 'the crops listed above'}.
            </Text>
            <Text style={styles.subtitle}>
              This recommendation is based on nitrogen, phosphorus, potassium levels, pH, 
              rainfall, and local weather conditions.
            </Text>
          </Card.Content>
        </Card>
        
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>{t('result.detailsTitle')}</Title>
            <View style={styles.parametersContainer}>
              <View style={styles.parameter}>
                <Text style={styles.parameterLabel}>{t('crop.inputLabels.nitrogen')}</Text>
                <Text style={styles.parameterValue}>{resultData?.nitrogen || 'N/A'}</Text>
              </View>
              <View style={styles.parameter}>
                <Text style={styles.parameterLabel}>{t('crop.inputLabels.phosphorus')}</Text>
                <Text style={styles.parameterValue}>{resultData?.phosphorous || 'N/A'}</Text>
              </View>
              <View style={styles.parameter}>
                <Text style={styles.parameterLabel}>{t('crop.inputLabels.potassium')}</Text>
                <Text style={styles.parameterValue}>{resultData?.potassium || 'N/A'}</Text>
              </View>
              <View style={styles.parameter}>
                <Text style={styles.parameterLabel}>{t('crop.inputLabels.ph')}</Text>
                <Text style={styles.parameterValue}>{resultData?.ph || 'N/A'}</Text>
              </View>
              <View style={styles.parameter}>
                <Text style={styles.parameterLabel}>{t('crop.inputLabels.rainfall')}</Text>
                <Text style={styles.parameterValue}>{resultData?.rainfall || 'N/A'} mm</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  const renderFertilizerResult = () => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.resultTitle}>Fertilizer Recommendation</Title>
          <Text style={styles.description}>
            {resultData?.recommendation || 'No specific recommendation available.'}
          </Text>
          
          <View style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Your Soil Parameters</Title>
          <View style={styles.parametersContainer}>
            <View style={styles.parameter}>
              <Text style={styles.parameterLabel}>Crop</Text>
              <Text style={styles.parameterValue}>{resultData?.crop || 'N/A'}</Text>
            </View>
            <View style={styles.parameter}>
              <Text style={styles.parameterLabel}>Nitrogen (N)</Text>
              <Text style={styles.parameterValue}>{resultData?.nitrogen || 'N/A'}</Text>
            </View>
            <View style={styles.parameter}>
              <Text style={styles.parameterLabel}>Phosphorus (P)</Text>
              <Text style={styles.parameterValue}>{resultData?.phosphorous || 'N/A'}</Text>
            </View>
            <View style={styles.parameter}>
              <Text style={styles.parameterLabel}>Potassium (K)</Text>
              <Text style={styles.parameterValue}>{resultData?.potassium || 'N/A'}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderDiseaseResult = () => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.resultTitle}>Disease Detection Result</Title>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Diagnosis:</Text>
          <Text style={styles.resultValue}>{resultData?.disease || 'Healthy'}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Recommendation:</Text>
          <Text style={styles.description}>
            {resultData?.recommendation || 'No specific recommendation available.'}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  const renderResult = () => {
    if (!resultData) {
      return <Text>No result data available</Text>;
    }

    switch (params.type) {
      case 'crop':
        return renderCropResult();
      case 'fertilizer':
        return renderFertilizerResult();
      case 'disease':
        return renderDiseaseResult();
      default:
        return <Text>No result available</Text>;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LanguageSelector />
      <View style={styles.content}>
        <Title style={styles.title}>{t('result.title')}</Title>
        
        {renderResult()}
        
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          {t('result.backToHome')}
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
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  parametersContainer: {
    marginTop: 10,
  },
  parameter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  parameterLabel: {
    fontSize: 16,
    color: '#555',
  },
  parameterValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    paddingVertical: 6,
  },
}); 