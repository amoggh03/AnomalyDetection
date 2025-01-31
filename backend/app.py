from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import joblib
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load the trained model and scaler
model = load_model('autoencoder_model.keras')  # Replace with your model file
scaler = joblib.load('scaler_data')  # Replace with your scaler file

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the frontend
    data = request.json
    speed = data['speed']
    vibration = data['vibration']

    # Simulate vibration data based on motor speed
    scaled_vibration = scaler.transform(np.array([vibration]).reshape(1, -1))
    scaled_vibration = scaled_vibration.reshape(1, 1, -1)

    # Predict using the autoencoder model
    prediction = model.predict(scaled_vibration)
    prediction = prediction.reshape(prediction.shape[0], prediction.shape[2])

    # Calculate MAE loss
    loss_mae = np.mean(np.abs(prediction - scaled_vibration.reshape(scaled_vibration.shape[0], scaled_vibration.shape[2])), axis=1)

    # Define threshold for anomaly detection
    threshold = 0.1  # Adjust based on your training results
    anomaly = loss_mae > threshold

    # Return the result
    return jsonify({
        'vibration': vibration,
        'loss_mae': float(loss_mae),
        'anomaly': bool(anomaly)
    })

if __name__ == '__main__':
    app.run(debug=True)