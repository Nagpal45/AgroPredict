import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

data = pd.read_csv("../Data-raw/raw_districtwise_yield_data.csv")

data.dropna(inplace=True)

label_encoders = {}
categorical_columns = ['State_Name', 'District_Name', 'Season', 'Crop']
for col in categorical_columns:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    label_encoders[col] = le

X = data[['State_Name', 'District_Name', 'Crop_Year', 'Season', 'Crop', 'Area']]
y = data['Production']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, "crop_yield_model.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")

y_pred = model.predict(X_test)


r2 = r2_score(y_test, y_pred)
print(f"Mean Absolute Error: {mae}")
print(f"R2 Score: {r2}")

def predict_production(state, district, year, season, crop, area):
    label_encoders = joblib.load("label_encoders.pkl")
    model = joblib.load("crop_yield_model.pkl")
    
    def safe_transform(encoder, value):
        if value in encoder.classes_:
            return encoder.transform([value])[0]
        else:
            return 0
    
    state_encoded = safe_transform(label_encoders['State_Name'], state)
    district_encoded = safe_transform(label_encoders['District_Name'], district)
    season_encoded = safe_transform(label_encoders['Season'], season)
    crop_encoded = safe_transform(label_encoders['Crop'], crop)
    
    input_data = np.array([[state_encoded, district_encoded, year, season_encoded, crop_encoded, area]])
    return model.predict(input_data)[0]

predicted_yield = predict_production("Andaman and Nicobar Islands", "NICOBARS", 2022, "Kharif", "Rice", 100)
print(f"Predicted Production: {predicted_yield}")

plt.figure(figsize=(10, 6))
sns.barplot(x=X.columns, y=model.feature_importances_)
plt.xlabel("Features")
plt.ylabel("Importance")
plt.title("Feature Importance in Crop Yield Prediction")
plt.xticks(rotation=45)
plt.show()

plt.figure(figsize=(10, 6))
sns.scatterplot(x=y_test, y=y_pred)
plt.xlabel("Actual Production")
plt.ylabel("Predicted Production")
plt.title("Actual vs Predicted Production")
plt.show()

plt.figure(figsize=(10, 6))
sns.histplot(y_test - y_pred, bins=30, kde=True)
plt.xlabel("Residuals")
plt.ylabel("Frequency")
plt.title("Residuals Distribution")
plt.show()
