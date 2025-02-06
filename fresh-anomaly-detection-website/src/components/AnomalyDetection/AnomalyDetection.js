import React from 'react';
import './AnomalyDetection.css';

const AnomalyDetection = ({ anomalyStatus }) => {
  return (
    <div>
      <h3>Anomaly Detection</h3>
      {anomalyStatus ? (
        <p style={{ color: 'red' }}>Anomaly Detected!</p>
      ) : (
        <p style={{ color: 'green' }}>No Anomalies Detected</p>
      )}
    </div>
  );
};

export default AnomalyDetection;