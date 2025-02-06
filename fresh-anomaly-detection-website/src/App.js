// src/App.js

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar'; // Default import
import VideoPlayer from './components/VideoPlayer/VideoPlayer'; // Default import
import SpeedController from './components/SpeedController/SpeedController'; // Default import
import SensorDisplay from './components/SensorDisplay/SensorDisplay'; // Default import
import AnomalyDetection from './components/AnomalyDetection/AnomalyDetection'; // Default import
import Footer from './components/Footer/Footer'; // Default import
import { fetchData } from './utils/dataHandler';

function App() {
  const [speed, setSpeed] = useState(0); // Motor speed
  const [vibration, setVibration] = useState([0.0, 0.0, 0.0, 0.0]); // Vibration values
  const [temperature, setTemperature] = useState(70); // Temperature
  const [anomalyStatus, setAnomalyStatus] = useState(false); // Anomaly status
  const [tempAlert, setTempAlert] = useState(null); // Temperature alert

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const data = await fetchData(speed); // Fetch data from the backend
        setVibration(data.vibration);
        setTemperature(data.temperature);
        setAnomalyStatus(data.anomaly);
        setTempAlert(data.temp_alert || '');
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }, 1000); // Fetch data every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [speed]);

  return (
    <div>
      <Navbar />
      <VideoPlayer videoSrc="/videos/motor.mp4" />
      <SpeedController speed={speed} setSpeed={setSpeed} />
      <SensorDisplay vibration={vibration} temperature={temperature} tempAlert={tempAlert} />
      <AnomalyDetection anomalyStatus={anomalyStatus} />
      <Footer />
    </div>
  );
}

export default App;