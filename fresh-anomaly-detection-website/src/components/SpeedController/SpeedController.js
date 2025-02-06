// src/components/SpeedController/SpeedController.js

import React from 'react';
import './SpeedController.css';

const SpeedController = ({ speed, setSpeed }) => {
  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value, 10); // Convert input value to integer
    setSpeed(newSpeed);
  };

  return (
    <div>
      <label htmlFor="speed">Motor Speed:</label>
      <input
        type="range"
        id="speed"
        min="0"
        max="5"
        value={speed}
        onChange={handleSpeedChange}
      />
      <span>{speed}</span>
    </div>
  );
};

export default SpeedController;