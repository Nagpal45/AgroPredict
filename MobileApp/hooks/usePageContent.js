import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * A hook that helps to generate content for text-to-speech based on page data
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.pageName - The name of the current page/section ('home', 'crop', etc.)
 * @param {Object} options.pageData - Optional data object specific to the page
 * @return {string} The content to be read by the TTS engine
 */
export default function usePageContent({ pageName, pageData = {} }) {
  const { t } = useTranslation();
  
  const generateHomeContent = useCallback(() => {
    return [
      t('home.welcome'),
      t('home.subtitle'),
      t('home.appDescription'),
      `${t('home.features')}:`,
      `${t('features.cropRecommendation.title')}: ${t('features.cropRecommendation.description')}`,
      `${t('features.fertilizerRecommendation.title')}: ${t('features.fertilizerRecommendation.description')}`,
      `${t('features.diseaseDetection.title')}: ${t('features.diseaseDetection.description')}`,
      `${t('home.howToUse')}:`,
      t('home.step1'),
      t('home.step2'),
      t('home.step3')
    ].join('. ');
  }, [t]);
  
  const generateCropContent = useCallback(() => {
    let content = [
      t('crop.title'),
      t('crop.description'),
      t('crop.inputHelp')
    ];
    
    // Add form field labels
    Object.keys(t('crop.inputLabels', { returnObjects: true })).forEach(key => {
      content.push(t(`crop.inputLabels.${key}`));
    });
    
    // If results are available, add them
    if (pageData.result) {
      content.push(`${t('result.recommendationTitle')}: ${pageData.result.recommendation}`);
      content.push(`${t('result.detailsTitle')}: ${pageData.result.details}`);
    }
    
    return content.join('. ');
  }, [t, pageData]);
  
  const generateFertilizerContent = useCallback(() => {
    let content = [
      t('fertilizer.title'),
      t('fertilizer.description'),
      t('fertilizer.inputHelp')
    ];
    
    // Add form field labels
    Object.keys(t('fertilizer.inputLabels', { returnObjects: true })).forEach(key => {
      content.push(t(`fertilizer.inputLabels.${key}`));
    });
    
    // If results are available, add them
    if (pageData.result) {
      content.push(`${t('result.recommendationTitle')}: ${pageData.result.recommendation}`);
      content.push(`${t('result.detailsTitle')}: ${pageData.result.details}`);
    }
    
    return content.join('. ');
  }, [t, pageData]);
  
  const generateDiseaseContent = useCallback(() => {
    let content = [
      t('disease.title'),
      t('disease.description'),
      t('disease.instructions')
    ];
    
    // If results are available, add them
    if (pageData.result) {
      content.push(`${t('result.recommendationTitle')}: ${pageData.result.recommendation}`);
      content.push(`${t('result.detailsTitle')}: ${pageData.result.details}`);
    }
    
    return content.join('. ');
  }, [t, pageData]);
  
  const generateResultContent = useCallback(() => {
    if (!pageData.result) return t('result.title');
    
    return [
      t('result.title'),
      `${t('result.recommendationTitle')}: ${pageData.result.recommendation}`,
      `${t('result.detailsTitle')}: ${pageData.result.details}`
    ].join('. ');
  }, [t, pageData]);
  
  // Select the appropriate content generator based on the page name
  const getContent = useCallback(() => {
    switch (pageName) {
      case 'home':
        return generateHomeContent();
      case 'crop':
        return generateCropContent();
      case 'fertilizer':
        return generateFertilizerContent();
      case 'disease':
        return generateDiseaseContent();
      case 'result':
        return generateResultContent();
      default:
        return '';
    }
  }, [pageName, generateHomeContent, generateCropContent, generateFertilizerContent, generateDiseaseContent, generateResultContent]);
  
  return {
    getContent
  };
} 