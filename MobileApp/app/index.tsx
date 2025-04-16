import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import SpeechButton from '../components/SpeechButton';
import usePageContent from '../hooks/usePageContent';

export default function HomeScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { getContent } = usePageContent({ pageName: 'home' });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LanguageSelector />
        
        <View style={styles.header}>
          <Title style={styles.title}>{t('home.appTitle')}</Title>
          <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>{t('home.welcome')}</Title>
            <Text style={styles.cardText}>
              {t('home.appDescription')}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>{t('home.features')}</Title>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>{t('features.cropRecommendation.title')}</Text>
              <Text style={styles.featureDescription}>
                {t('features.cropRecommendation.description')}
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>{t('features.fertilizerRecommendation.title')}</Text>
              <Text style={styles.featureDescription}>
                {t('features.fertilizerRecommendation.description')}
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>{t('features.diseaseDetection.title')}</Text>
              <Text style={styles.featureDescription}>
                {t('features.diseaseDetection.description')}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>{t('home.howToUse')}</Title>
            <Text style={styles.cardText}>
              {t('home.step1')}
            </Text>
            <Text style={styles.cardText}>
              {t('home.step2')}
            </Text>
            <Text style={styles.cardText}>
              {t('home.step3')}
            </Text>
          </Card.Content>
        </Card>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
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
  bottomPadding: {
    height: 80,
  },
}); 