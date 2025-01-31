import React, { useState } from 'react';
import './SpeedController.css';

const SpeedController = ({ setSpeed }) => {
  const [speedValue, setSpeedValue] = useState(1);

  const handleChange = (event) => {
    const value = parseFloat(event.target.value);
    setSpeedValue(value);
    setSpeed(value);
  };

  return (
    <div className="speed-controller-container">
      <label htmlFor="speed" className="speed-label">Motor Speed:</label>
      <input type="range" id="speed" min="0.5" max="2" step="0.1" value={speedValue} onChange={handleChange} className="speed-input" />
      <span className="speed-value">{speedValue}x</span>
    </div>
  );
};

export default SpeedController;