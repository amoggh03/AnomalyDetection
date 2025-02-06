// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import SpeedController from '../components/SpeedController/SpeedController';
import SensorDisplay from '../components/SensorDisplay/SensorDisplay';
import AnomalyDetection from '../components/AnomalyDetection/AnomalyDetection';
import Footer from '../components/Footer/Footer';
import { fetchData } from '../utils/dataHandler';

const HomePage = () => {
  const [speed, setSpeed] = useState(1);
  const [vibration, setVibration] = useState(0.5); // Example value
  const [temperature, setTemperature] = useState(70); // Example value

  useEffect(() => {
    const updateData = async () => {
      const data = await fetchData();
      setVibration(data.vibration);
      setTemperature(data.temperature);
    };

    updateData();
    const intervalId = setInterval(updateData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <Navbar />
      <VideoPlayer speed={speed} />
      <SpeedController setSpeed={setSpeed} />
      <SensorDisplay vibration={vibration} temperature={temperature} />
      <AnomalyDetection vibration={vibration} temperature={temperature} />
      <Footer />
    </div>
  );
};

export default HomePage;