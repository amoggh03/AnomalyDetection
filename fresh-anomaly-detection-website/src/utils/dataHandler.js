// src/utils/dataHandler.js

export const fetchData = async (speed) => {
  try {
    // Simulate backend response with realistic vibration values
    const baseVibration = [0.001, 0.001, 0.001, 0.001]; // Base vibration at speed 0
    const vibrationFactor = Math.min(speed / 3, 1); // Scale vibration up to speed 3
    const anomalyThreshold = 0.2; // Threshold for anomaly detection

    // Generate vibration values
    const vibration = baseVibration.map((value) => value + vibrationFactor * Math.random());

    // Simulate temperature rise
    const temperature = 70 + speed * 5;

    // Detect anomalies only when speed > 3
    const anomaly = speed > 3 && vibration.some((val) => val > anomalyThreshold);

    // Simulate a temperature alert if temperature exceeds 90°C
    const tempAlert = temperature > 90 ? 'High Temperature Alert!' : null;

    return {
      anomaly,
      loss_mae: Math.random() * 0.3, // Simulated loss value
      temp_alert: tempAlert,
      temperature,
      vibration,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};