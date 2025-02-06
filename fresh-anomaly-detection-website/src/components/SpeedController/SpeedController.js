import React from 'react';
import './SpeedController.css';

const SpeedController = ({ speed, setSpeed }) => {
  return (
    <div>
      <label htmlFor="speed">Motor Speed:</label>
      <input
        type="range"
        id="speed"
        min="0"
        max="5"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
      <span>{speed}</span>
    </div>
  );
};

export default SpeedController;