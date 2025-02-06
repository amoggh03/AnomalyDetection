// src/components/SpeedController/SpeedController.js

import React from 'react';
import './SpeedController.css';

const SpeedController = ({ speed, setSpeed }) => {
  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value, 10); // Convert input value to integer
    setSpeed(newSpeed);
  };

  const toggleMotor = () => {
    if (speed === 0) {
      setSpeed(1); // Start motor at minimum speed (1)
    } else {
      setSpeed(0); // Stop motor
    }
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
        disabled={speed === 0} // Disable slider when motor is stopped
      />
      <span>{speed}</span>

      <button onClick={toggleMotor}>
        {speed === 0 ? 'Start Motor' : 'Stop Motor'}
      </button>
    </div>
  );
};

export default SpeedController;