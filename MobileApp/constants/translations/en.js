export default {
  home: {
    welcome: 'Welcome to AgroPredict',
    subtitle: 'Agriculture Assistant for Smart Farming',
    appTitle: 'AgroPredict Mobile',
    features: 'Features',
    howToUse: 'How to Use',
    appDescription: 'This app helps farmers make better decisions using data-driven recommendations. Use the tabs below to access different features.',
    step1: '1. Navigate using the bottom tabs',
    step2: '2. Enter required information or upload images',
    step3: '3. View results and recommendations'
  },
  features: {
    cropRecommendation: {
      title: 'Crop Recommendation',
      description: 'Get recommendations for the best crops to plant based on soil and weather conditions.'
    },
    fertilizerRecommendation: {
      title: 'Fertilizer Recommendation',
      description: 'Find the optimal fertilizer based on your soil conditions and crop type.'
    },
    diseaseDetection: {
      title: 'Plant Disease Detection',
      description: 'Detect plant diseases by uploading images of affected plants.'
    }
  },
  crop: {
    title: 'Crop Recommendation',
    description: 'Enter soil and climate data to get crop recommendations',
    inputLabels: {
      nitrogen: 'Nitrogen (N)',
      phosphorus: 'Phosphorus (P)',
      potassium: 'Potassium (K)',
      ph: 'pH Value',
      rainfall: 'Rainfall (mm)',
      city: 'City (for weather data)'
    },
    getRecommendation: 'Get Recommendation',
    inputHelp: 'Enter values for all fields to get accurate results'
  },
  fertilizer: {
    title: 'Fertilizer Recommendation',
    description: 'Get fertilizer recommendations based on soil conditions',
    inputLabels: {
      cropType: 'Crop Type',
      nitrogen: 'Nitrogen (N)',
      phosphorus: 'Phosphorus (P)',
      potassium: 'Potassium (K)',
    },
    getRecommendation: 'Get Recommendation',
    inputHelp: 'Enter soil nutrient values and select crop type'
  },
  disease: {
    title: 'Plant Disease Detection',
    description: 'Upload an image of your plant to identify diseases',
    uploadImage: 'Upload Image',
    takePhoto: 'Take Photo',
    analyze: 'Analyze Image',
    instructions: 'Take a clear photo of the affected plant part'
  },
  result: {
    title: 'Results',
    recommendationTitle: 'Recommendation',
    detailsTitle: 'Details',
    backToHome: 'Back to Home',
    tryAgain: 'Try Again'
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    submit: 'Submit',
    cancel: 'Cancel',
    readAloud: 'Read Aloud',
    stopReading: 'Stop Reading',
    ttsNotAvailable: 'Text-to-speech not available'
  }
}; 