# AgroPredict Mobile App

A React Native mobile application using Expo that connects to the AgroPredict Flask backend to provide agriculture-related assistance on-the-go.

## Features

- **Crop Recommendation**: Get recommendations on which crops to plant based on soil parameters and weather conditions.
- **Fertilizer Recommendation**: Receive fertilizer suggestions based on crop type and soil nutrients.
- **Plant Disease Detection**: Upload images of plant leaves to detect diseases.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device or an Android/iOS emulator

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd MobileApp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the backend URL:
   Open the crop.tsx, fertilizer.tsx, and disease.tsx files and update the `BASE_URL` variable with your Flask server's IP address:
   ```typescript
   const BASE_URL = 'http://your-flask-server-ip:5000';
   ```

## Running the App

1. Start the Expo development server:
   ```
   npx expo start
   ```

2. This will open up a browser window with a QR code. You can:
   - Scan the QR code with your mobile device using the Expo Go app
   - Press 'a' in the terminal to open in an Android emulator
   - Press 'i' in the terminal to open in an iOS simulator (MacOS only)

## App Structure

This project follows Expo's file-based routing approach:

- `app/_layout.tsx`: Main tab layout configuration
- `app/index.tsx`: Home screen 
- `app/crop.tsx`: Crop recommendation screen
- `app/fertilizer.tsx`: Fertilizer recommendation screen
- `app/disease.tsx`: Disease detection screen
- `app/result.tsx`: Results display screen

## Connecting to the Flask Backend

Make sure your Flask backend is running and accessible from your mobile device. If you're running the app on a physical device, both your phone and the computer running the Flask server should be on the same Wi-Fi network.

## Building for Production

To build a standalone app for distribution:

```
eas build -p android  # For Android
eas build -p ios      # For iOS (requires an Apple Developer account)
```

## License

This project is licensed under the MIT License.
