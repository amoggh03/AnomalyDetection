import React from 'react';

const predictAnomaly = (vib, temp) => {
  // Simple example logic, replace with actual model prediction
  if (vib > 1.0 || temp > 90) {
    return 'Anomaly';
  } else {
    return 'Normal';
  }
};

const AnomalyDetection = ({ vibration, temperature }) => {
  const anomalyStatus = predictAnomaly(vibration, temperature);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3>Anomaly Status: {anomalyStatus}</h3>
    </div>
  );
};

export default AnomalyDetection;