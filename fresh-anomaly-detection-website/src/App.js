// src/App.js

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import SpeedController from './components/SpeedController/SpeedController';
import PredictiveMonitor from './components/PredictiveMonitor/PredictiveMonitor';
import MotorDataDisplay from './components/MotorDataDisplay/MotorDataDisplay';
import AnomalyDetection from './components/AnomalyDetection/AnomalyDetection';
import Footer from './components/Footer/Footer';
import { fetchData } from './utils/dataHandler';

function App() {
  const [speed, setSpeed] = useState(0);
  const [vibration, setVibration] = useState([0.0, 0.0, 0.0, 0.0]);
  const [temperature, setTemperature] = useState(70);
  const [anomalyStatus, setAnomalyStatus] = useState(false);

  useEffect(() => {
    let intervalId;

    if (speed > 0) {
      intervalId = setInterval(async () => {
        try {
          const data = await fetchData(speed);
          setVibration(data.vibration);
          setTemperature(data.temperature);
          setAnomalyStatus(data.anomaly);
        } catch (error) {
          console.error('Error updating data:', error);
        }
      }, 1000);
    } else {
      intervalId = setInterval(() => {
        setTemperature((prevTemp) => Math.max(prevTemp - 1, 70));
        setVibration([0.0, 0.0, 0.0, 0.0]);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [speed]);

  return (
    <div>
      <Navbar />
      <div className="layout">
        {/* Left Panel */}
        <div className="left-panel">
          <PredictiveMonitor />
          <MotorDataDisplay temperature={temperature} vibration={vibration} speed={speed} />
          <AnomalyDetection anomalyStatus={anomalyStatus} />
        </div>

        {/* Center Panel (Video Player) */}
        <div className="center-panel">
          <VideoPlayer videoSrc="/videos/motor.mp4" speed={speed} />
        </div>
      </div>

      {/* Bottom Panel (Controls) */}
      <div className="controls-container">
        <SpeedController speed={speed} setSpeed={setSpeed} />
      </div>

      <Footer />
    </div>
  );
}

export default App;