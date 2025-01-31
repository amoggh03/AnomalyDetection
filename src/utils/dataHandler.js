// src/utils/dataHandler.js
export const fetchData = async () => {
    // Simulate fetching data from an API
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          vibration: Math.random() * 2,
          temperature: 50 + Math.random() * 50,
        });
      }, 1000);
    });
  };