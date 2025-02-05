from flask import Flask, request, jsonify
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from flask_cors import CORS  # Import CORS


app = Flask(__name__)

# Enable CORS for all routes and allow requests from http://localhost:3000
CORS(app, origins=["http://localhost:3000"])

# Rest of your Flask app code...

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
vibration_values = [0.0, 0.0, 0.0, 0.0]  # Initial vibration values [bearingA_x, bearingA_y, bearingB_x, bearingB_y]# Initial vibration values [bearingA_x, bearingA_y, bearingB_x, bearingB_y]  # Initial vibration values [bearingA_x, bearingA_y, bearingB_x, bearingB_y]
# Existing /predict route
@app.route('/predict', methods=['POST'])
def predict():
    print("Received request at /predict endpoint")  # Debugging statement
    global motor_speed, temperature, vibration_values

    try:
        # Get JSON data from the frontend
        data = request.json
        print(f"Received JSON data: {data}")  # Debugging statement
        motor_speed = data['speed']
        print(f"Received speed: {motor_speed}")  # Debugging statement

        # Simulate vibration values based on motor speed
        if motor_speed > 0:
            vibration_values = [
                np.random.uniform(-0.1, -0.05) * motor_speed,  # bearingA_x
                np.random.uniform(0.01, 0.05) * motor_speed,   # bearingA_y
                np.random.uniform(-0.05, 0.05) * motor_speed,  # bearingB_x
                np.random.uniform(-0.01, 0.01) * motor_speed   # bearingB_y
            ]
        else:
            vibration_values = [0.0, 0.0, 0.0, 0.0]  # Reset vibration when motor stops

        print(f"Generated vibration values: {vibration_values}")  # Debugging statement

        # Simulate temperature based on motor speed and runtime
        if motor_speed > 0:
            temperature += 0.1 * motor_speed  # Gradually increase temperature
        else:
            temperature -= 1  # Gradually decrease temperature when motor stops
            temperature = max(temperature, 70)  # Ensure temperature doesn't drop below initial value

        print(f"Updated temperature: {temperature}")  # Debugging statement

        # Scale vibration values for anomaly detection
        scaled_vibration = scaler.transform(np.array([vibration_values]))
        scaled_vibration = scaled_vibration.reshape(1, 1, -1)

        # Predict using the autoencoder model
        prediction = model.predict(scaled_vibration)
        prediction = prediction.reshape(prediction.shape[0], prediction.shape[2])

        # Calculate MAE loss
        loss_mae = np.mean(np.abs(prediction - scaled_vibration.reshape(scaled_vibration.shape[0], scaled_vibration.shape[2])), axis=1)

        # Define thresholds for anomaly detection
        mean_loss = 0.05  # Replace with your actual mean loss from training
        std_loss = 0.02   # Replace with your actual standard deviation from training
        upper_threshold = mean_loss + 3 * std_loss
        lower_threshold = mean_loss - 3 * std_loss

        # Determine if an anomaly is detected
        anomaly = (loss_mae > upper_threshold) | (loss_mae < lower_threshold)

        # Check for temperature alert
        temp_alert = "Please check the temperature" if temperature > 120 else None

        # Return the result
        return jsonify({
            'vibration': vibration_values,
            'temperature': round(temperature, 2),
            'loss_mae': float(loss_mae),
            'anomaly': bool(anomaly),
            'temp_alert': temp_alert
        })
    except Exception as e:
        print(f"Error in /predict: {e}")  # Debugging statement
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, port=5001)  # Use a different port    print("Starting Flask server...")
    app.run(debug=True)