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
    
    let content = [t('result.title')];
    
    // Add the basic recommendation and details if available
    if (pageData.result.recommendation) {
      content.push(`${t('result.recommendationTitle')}: ${pageData.result.recommendation}`);
    }
    
    if (pageData.result.details) {
      content.push(`${t('result.detailsTitle')}: ${pageData.result.details}`);
    }
    
    // If we have more specific data in the API response, add it
    if (pageData.apiResult) {
      const data = pageData.apiResult;
      
      // Add any specific field values that are present
      if (data.prediction) {
        content.push(`${t('result.recommendationTitle')}: ${data.prediction}`);
      }
      
      if (data.crop) {
        content.push(`${t('crop.inputLabels.crop')}: ${data.crop}`);
      }
      
      if (data.disease) {
        content.push(`${t('disease.title')}: ${data.disease}`);
      }
      
      // Add soil parameters if available
      const soilParams = [];
      if (data.nitrogen !== undefined) soilParams.push(`${t('crop.inputLabels.nitrogen')}: ${data.nitrogen}`);
      if (data.phosphorous !== undefined) soilParams.push(`${t('crop.inputLabels.phosphorus')}: ${data.phosphorous}`);
      if (data.potassium !== undefined) soilParams.push(`${t('crop.inputLabels.potassium')}: ${data.potassium}`);
      if (data.ph !== undefined) soilParams.push(`${t('crop.inputLabels.ph')}: ${data.ph}`);
      if (data.rainfall !== undefined) soilParams.push(`${t('crop.inputLabels.rainfall')}: ${data.rainfall} mm`);
      
      if (soilParams.length > 0) {
        content.push(`${t('result.detailsTitle')}: ${soilParams.join(', ')}`);
      }
      
      // Add recommendation text if available
      if (data.recommendation) {
        content.push(data.recommendation);
      }
    }
    
    return content.join('. ');
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