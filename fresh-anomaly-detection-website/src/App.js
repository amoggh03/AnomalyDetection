// src/App.js

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import SpeedController from './components/SpeedController/SpeedController';
import SensorDisplay from './components/SensorDisplay/SensorDisplay';
import AnomalyDetection from './components/AnomalyDetection/AnomalyDetection';
import Footer from './components/Footer/Footer';
import { fetchData } from './utils/dataHandler';

function App() {
  const [speed, setSpeed] = useState(0); // Motor speed
  const [vibration, setVibration] = useState([0.0, 0.0, 0.0, 0.0]); // Vibration values
  const [temperature, setTemperature] = useState(70); // Temperature
  const [anomalyStatus, setAnomalyStatus] = useState(false); // Anomaly status
  const [tempAlert, setTempAlert] = useState(null); // Temperature alert

  useEffect(() => {
    let intervalId;

    if (speed > 0) {
      // Fetch data every second while the motor is running
      intervalId = setInterval(async () => {
        try {
          const data = await fetchData(speed); // Pass the current speed to the backend
          if (data) {
            setVibration(data.vibration);
            setTemperature(data.temperature);
            setAnomalyStatus(data.anomaly);
            setTempAlert(data.temp_alert || '');
          }
        } catch (error) {
          console.error('Error updating data:', error);
        }
      }, 1000);
    } else {
      // Gradually decrease temperature and reset vibration when the motor is stopped
      intervalId = setInterval(() => {
        setTemperature((prevTemp) => Math.max(prevTemp - 1, 70)); // Decrease temperature
        setVibration([0.0, 0.0, 0.0, 0.0]); // Reset vibration values
      }, 1000);
    }

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [speed]);

  return (
    <div>
      <Navbar />
      <VideoPlayer videoSrc="/videos/motor.mp4" speed={speed} />
      <SpeedController speed={speed} setSpeed={setSpeed} />
      <SensorDisplay vibration={vibration} temperature={temperature} tempAlert={tempAlert} />
      <AnomalyDetection anomalyStatus={anomalyStatus} />
      <Footer />
    </div>
  );
}

export default App;