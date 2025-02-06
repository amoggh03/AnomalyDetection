import React from 'react';
import './SensorDisplay.css';

const SensorDisplay = ({ vibration, temperature, tempAlert }) => {
  return (
    <div>
      <h3>Vibration</h3>
      <p>bearingA_x: {vibration[0]?.toFixed(4)}</p>
      <p>bearingA_y: {vibration[1]?.toFixed(4)}</p>
      <p>bearingB_x: {vibration[2]?.toFixed(4)}</p>
      <p>bearingB_y: {vibration[3]?.toFixed(4)}</p>
      <h3>Temperature</h3>
      <p>{temperature.toFixed(2)}°C</p>
      {tempAlert && <p style={{ color: 'red' }}>{tempAlert}</p>}
    </div>
  );
};

export default SensorDisplay;