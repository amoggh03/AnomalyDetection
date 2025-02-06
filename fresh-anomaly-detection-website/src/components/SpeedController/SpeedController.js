import React from 'react';
import './SpeedController.css';

const SpeedController = ({ speed, setSpeed }) => {
  const handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value, 10);
    setSpeed(newSpeed);
  };

  const toggleMotor = () => {
    if (speed === 0) {
      setSpeed(1);
    } else {
      setSpeed(0);
    }
  };

  return (
    <div className="speed-controller">
      <button onClick={toggleMotor} className="toggle-button">
        {speed === 0 ? 'Start ⚙️' : 'Stop ⚙️'}
      </button>
      <input
        type="range"
        min="0"
        max="5"
        value={speed}
        onChange={handleSpeedChange}
        disabled={speed === 0}
        className="speed-slider"
      />
    </div>
  );
};

export default SpeedController;