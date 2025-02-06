from flask import Flask, request, jsonify
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow requests from React frontend

# Load the trained model and scaler
try:
    model = load_model('autoencoder_model.keras')  # Replace with your model file
    scaler = joblib.load('scaler_data')  # Replace with your scaler file
    print("Model and scaler loaded successfully.")
except Exception as e:
    print(f"Error loading model or scaler: {e}")
    exit(1)

# Global variables to track motor state
motor_speed = 0  # Current motor speed (0 = stopped, >0 = running)
temperature = 70  # Initial temperature
vibration_values = [0.0, 0.0, 0.0, 0.0]  # Initial vibration values [bearingA_x, bearingA_y, bearingB_x, bearingB_y]

# Threshold for anomaly detection (tuned based on training/validation loss)
ANOMALY_THRESHOLD = 0.1  # Adjust this value based on your dataset

@app.route('/predict', methods=['POST'])
def predict():
    global motor_speed, temperature, vibration_values

    # Parse incoming JSON data
    data = request.get_json()
    motor_speed = data.get('speed', 0)  # Default to 0 if 'speed' is missing

    # Simulate vibration data based on motor speed
    if motor_speed > 0:
        # Generate random vibration values within a realistic range
        vibration_values = [
            np.random.uniform(-0.2, 0.2),  # bearingA_x
            np.random.uniform(-0.1, 0.1),  # bearingA_y
            np.random.uniform(-0.1, 0.1),  # bearingB_x
            np.random.uniform(-0.1, 0.1)   # bearingB_y
        ]
        temperature += 0.5  # Simulate temperature increase when motor is running
    else:
        # Reset vibration values and simulate temperature decrease when motor is stopped
        vibration_values = [0.0, 0.0, 0.0, 0.0]
        temperature = max(temperature - 1, 70)  # Prevent temperature from dropping below 70

    # Scale the vibration data
    scaled_vibration = scaler.transform([vibration_values])

    # Reshape for LSTM input (samples, timesteps, features)
    scaled_vibration = scaled_vibration.reshape(scaled_vibration.shape[0], 1, scaled_vibration.shape[1])

    # Reconstruct the input using the autoencoder model
    reconstructed = model.predict(scaled_vibration)

    # Calculate the reconstruction error (MAE)
    loss_mae = np.mean(np.abs(scaled_vibration - reconstructed))

    # Detect anomaly based on the threshold
    anomaly = loss_mae > ANOMALY_THRESHOLD

    # Prepare the response
    response = {
        "anomaly": bool(anomaly),
        "loss_mae": float(loss_mae),
        "temp_alert": "Temperature too high!" if temperature > 90 else None,
        "temperature": float(temperature),
        "vibration": vibration_values
    }

    return jsonify(response)


if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, port=5001)