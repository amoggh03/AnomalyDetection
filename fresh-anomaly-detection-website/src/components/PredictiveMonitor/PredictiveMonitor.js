import React, { useState, useEffect, useRef } from 'react';
import './PredictiveMonitor.css';

const PredictiveMonitor = () => {
  const [logs, setLogs] = useState([]);
  const logBoxRef = useRef(null);

  // Fetch logs from the backend every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:5001/logs');
        const data = await response.json();
        setLogs(data.logs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Auto-scroll to the bottom when new logs arrive
  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="predictive-monitor">
      <h3>Predictive Monitor</h3>
      <div className="log-box" ref={logBoxRef}>
        {logs.map((log, index) => (
          <pre key={index}>{log}</pre>
        ))}
      </div>
    </div>
  );
};

export default PredictiveMonitor;
