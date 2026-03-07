<div align="center">
  <h1>🌱 AgroPredict</h1>
  <p>An AI-powered Smart Agriculture Web and Mobile application that provides intelligent crop recommendations, fertilizer suggestions, and plant disease classification using Machine Learning and Deep Learning.</p>
</div>

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Concepts & Methodologies](#-concepts--methodologies)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Running the Application](#-running-the-application)
- [Datasets](#-datasets)
- [Machine Learning Models](#-machine-learning-models)

---

## 🌾 About the Project

**AgroPredict** is an end-to-end full-stack AI platform designed to help farmers and agriculture enthusiasts make data-driven decisions. The system integrates machine learning to provide accurate crop recommendations based on soil testing and real-time weather data. Additionally, it offers a deep learning-powered visual disease classification system for plant leaves and smart fertilizer selection based on soil NPK thresholds.

The project is natively available as a **Flask Web Application** and a fully functional cross-platform **Mobile App** built with React Native (Expo).

---

## ✨ Key Features

1. **Crop Recommendation 🌱**
   - Suggests the most suitable crop to plant based on Soil variables (Nitrogen, Phosphorous, Potassium, pH) and environmental metrics (Rainfall).
   - Dynamically fetches realtime **Temperature** and **Humidity** for the provided city using the OpenWeatherMap API.

2. **Fertilizer Recommendation 🧪**
   - Employs rule-based heuristics comparing target nutrient levels corresponding to crops and current soil NPK ratios.
   - Prescribes actionable advice to raise or lower specific soil nutrient levels.

3. **Plant Disease Classification 🦠**
   - Users can upload an image of a plant leaf.
   - The application leverages a finely-tuned **ResNet9 PyTorch Deep Learning model** to classify the image against 38 different plant disease classes.

4. **Multi-Platform & Accessibility 📱**
   - Functional Web Interface using Flask, HTML, CSS.
   - **Cross-Platform React Native App** enabling mobile functionality.
   - **Multi-language Support (i18n)** with **English** and **Hindi** translations.
   - **Text-to-Speech** (SpeechButton) integration for better accessibility.

---

## 🧠 Concepts & Methodologies

| Core Concept               | Description                                                                                                                                           |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Classification (ML)**    | The project utilizes a `Random Forest Classifier` mapped over an extensively trained agricultural dataset to predict the optimal crop category.        |
| **Computer Vision (DL)**   | A convolutional neural network architecture (`ResNet9`) maps pixel data of crop leaves into predicted categorical distributions for disease profiling. |
| **API Integrations**       | Incorporates the **OpenWeatherMap API** to compute live weather markers mapping out temperature and humidity constraints in recommendation queries.    |
| **Mobile Accessibility**   | Built with Expo SDK & React Native utilizing custom hooks, `React Navigation` (Tabs/Stack), native device sensors, gestures, and audio accessibility.  |
| **Data Imputation**        | Notebooks cover robust pandas operations for joining raw CP data, fertilizer, and crop metrics into clean pre-processed sets for training pipelines. |

---

## 🛠 Tech Stack

### 🚀 Backend & Machine Learning
- **Python 3.x**
- **Flask** (Web Application & API serving)
- **PyTorch & Torchvision** (ResNet9 Plant Disease Model Training and Inference)
- **Scikit-Learn & XGBoost** (Random Forest for Crop Forecasting)
- **Pandas & NumPy** (Data Processing)
- **Jupyter Notebook** (Mathematical EDA and Data Modelling pipelines)

### 🎨 Frontend Web
- **HTML5 & CSS3**
- **JavaScript**
- **Jinja2** (Flask Templating)

### 📱 Mobile Dashboard (Cross-Platform)
- **React Native** & **Expo SDK 52**
- **Expo Router** / React Navigation
- **i18next** (Multilingual Context - Hindi/English)
- **Axios** (API interfacing)

---

## 📂 Project Structure

```text
Agropredict/
│
├── app/                       # Flask Web Backend and API Routes
│   ├── app.py                 # Core Flask application and endpoints
│   ├── config.py              # Environment and API configurations
│   ├── static/                # CSS Styles and JS scripts (cities.js)
│   ├── templates/             # HTML Templates (Jinja2)
│   └── utils/                 # ML processing scripts (disease.py, fertilizer.py)
│
├── MobileApp/                 # React Native / Expo Mobile App codebase
│   ├── app/                   # Expo Router layout & structural screens
│   ├── components/            # UI components (Collapsible, HapticTab, SpeechButton)
│   ├── constants/             # Theming (Colors) and i18n locales (en, hi)
│   ├── hooks/                 # Custom React Hooks
│   ├── App config files       # package.json, app.json, tsconfig.json
│
├── model-building/            # Core Jupyter Notebooks detailing algorithm choices
│   ├── Crop_Recommendation_Model.ipynb
│   └── plant-disease-classification.ipynb
│
├── models/                    # Exported and Serialized ML weights
│   ├── plant_disease_model.pth # PyTorch Weights
│   └── RandomForest.pkl       # Sklearn classifier (inside app/models logically)
│
├── data-prep/                 # Pre-processing configurations
├── data-processed/            # Cleaned final datasets ready for regression algorithms
├── Data-raw/                  # Open-source agriculture raw datasets
└── requirements.txt           # Python application dependencies
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
Ensure you have the following installed on your local machine:
- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js 18+](https://nodejs.org/) & npm (For Mobile App)
- OpenWeatherMap API Key.

### 2. Backend / Web App Deployment
1. Clone the repository and navigate to the project directory.
2. Create a virtual environment (Optional but Recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install the Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configuration:
   Open `app/config.py` and set your OpenWeather API Key:
   ```python
   weather_api_key = "YOUR_API_KEY_HERE"
   ```

### 3. Mobile App Deployment
1. Navigate into the `MobileApp/` directory:
   ```bash
   cd MobileApp
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. You may need to edit `MobileApp/app/config.js` or `.env` files if they possess absolute API URL properties mapping natively to your local python backend server IP network.

---

## 💻 Running the Application

### Running the Web Server Backend
To spin up the FLASK server, run:
```bash
cd app
python app.py
```
*The web API will successfully run locally at `http://127.0.0.1:5000`.*

### Running the Mobile Client App
To run the React Native Expo app:
```bash
cd MobileApp
npm start
```
- Press **a** to open on an Android Emulator.
- Press **w** to open on Web.
- Alternatively, download the **Expo Go** application on your mobile device and scan the generated QR code.

---

## 📊 Datasets

The raw data sources reside in the `Data-raw/` folder, spanning combinations of historical agricultural records encompassing crop parameters and fertilizer dependencies. The `data-prep/` pipeline joins these datasets ensuring cohesive data frames generated to `./data-processed/` to be uniformly fed into the `scikit-learn` algorithms. 

---

## 🤖 Machine Learning Models

### 1. Crop Recommendation (Random Forest)
An ensemble learning algorithm. A multitude of decision trees are generated during training to account for non-linear soil permutations accurately outputting an individual nominal crop classification to minimize entropy.

### 2. Plant Disease Recognition (ResNet-9)
Utilizes Transfer Learning on a **ResNet9** infrastructure (Residual Neural Networks), tackling vanishing gradients and ensuring deep layered training. Sourced out of the PyTorch ecosystem (`torch` & `torchvision`), it accepts transposed normalized RGB images mapping inferences correctly targeting categories like 'Tomato___Bacterial_spot' or 'Healthy'.