import React from 'react';
import './MotorDataDisplay.css';

const MotorDataDisplay = ({ temperature, vibration, speed }) => {
  return (
    <div className="motor-data-display">
      <h3>Motor Data</h3>

      {/* Temperature Display */}
      <div className="data-item">
        <span>Temperature:</span> {temperature}°C
      </div>

      {/* Vibration Data Container for Bearings 2-4 with Speed */}
      <div className="vibration-data">
        <span>Vibration:</span>
        <div className="vibration-values">
          {vibration.slice(0, 4).map((val, i) => (
            <div key={i} className="bearing-item">
              Bearing{i + 1}: {val.toFixed(4)}
            </div>
          ))}
          {/* Speed Display inside a Circle */}
          <div className="speed-circle">{speed}</div>
        </div>
      </div>
    </div>
  );
};

export default MotorDataDisplay;