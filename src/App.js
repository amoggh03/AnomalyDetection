import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import SpeedController from './components/SpeedController/SpeedController';
import SensorDisplay from './components/SensorDisplay/SensorDisplay';
import AnomalyDetection from './components/AnomalyDetection/AnomalyDetection';
import Footer from './components/Footer/Footer';

function App() {
  const [speed, setSpeed] = React.useState(1);
  const [vibration, setVibration] = React.useState(0.5); // Example value
  const [temperature, setTemperature] = React.useState(70); // Example value

  return (
    <div className="App">
      <Navbar />
      <VideoPlayer speed={speed} />
      <SpeedController setSpeed={setSpeed} />
      <SensorDisplay vibration={vibration} temperature={temperature} />
      <AnomalyDetection vibration={vibration} temperature={temperature} />
      <Footer />
    </div>
  );
}

export default App;