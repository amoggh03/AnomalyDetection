// src/components/SpeedController/SpeedController.js

import React from 'react';
import './SpeedController.css';

const SpeedController = ({ speed, setSpeed }) => {
  const toggleMotor = () => {
    setSpeed(speed === 0 ? 1 : 0); // Toggle between 0 (stopped) and 1 (running)
  };

  return (
    <div>
      <button onClick={toggleMotor}>
        {speed === 0 ? 'Start Motor' : 'Stop Motor'}
      </button>
      <p>Current Speed: {speed}</p>
    </div>
  );
};

export default SpeedController;