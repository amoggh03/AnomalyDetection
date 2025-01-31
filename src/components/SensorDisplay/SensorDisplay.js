import React from 'react';

const SensorDisplay = ({ vibration, temperature }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', width: '150px', textAlign: 'center' }}>
        <h3>Vibration</h3>
        <p>{vibration.toFixed(2)}</p>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', width: '150px', textAlign: 'center' }}>
        <h3>Temperature</h3>
        <p>{temperature.toFixed(2)}°C</p>
      </div>
    </div>
  );
};

export default SensorDisplay;