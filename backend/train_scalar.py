from sklearn.preprocessing import MinMaxScaler
import joblib
import pandas as pd

# Load your dataset
data = pd.read_csv('/Users/amoggha/anomaly-detection-website/backend/normall.csv')

# Fit the scaler
scaler = MinMaxScaler()
scaler.fit(data)

# Save the scaler
joblib.dump(scaler, 'scaler_data')  # Save with the correct file name
print("Scaler saved successfully.")