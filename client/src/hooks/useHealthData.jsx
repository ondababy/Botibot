import { useState, useEffect, useRef } from 'react';

export const useHealthData = () => {
  const [healthData, setHealthData] = useState({
    heartRate: 72,
    temperature: 98.6,
    pillWeight: 24.7,
    pillCount: 30,
    nextMedication: {
      time: '12:00 PM',
      name: 'Aspirin 81mg',
      countdown: '1h 36m'
    },
    safetyStatus: {
      faceRecognition: 'active',
      alcoholDetection: 'clear',
      heightSensor: 'active',
      orientation: 'stable',
      gsmConnection: 'connected'
    },
    alerts: [
      { id: 1, message: 'Medication reminder sent successfully', time: '09:45 AM' },
      { id: 2, message: 'SMS notification to caregiver', time: '09:30 AM' },
      { id: 3, message: 'System startup completed', time: '08:00 AM' },
      { id: 4, message: 'All sensors calibrated', time: '08:00 AM' }
    ]
  });

  const intervalRef = useRef();

  // Fetch data from Flask backend
  const fetchSensorData = async () => {
    try {
      const response = await fetch('/api/sensors');
      if (response.ok) {
        const data = await response.json();
        setHealthData(prevData => ({
          ...prevData,
          heartRate: data.heartRate || prevData.heartRate,
          temperature: data.temperature || prevData.temperature,
          pillWeight: data.pillWeight || prevData.pillWeight,
          safetyStatus: data.safetyStatus || prevData.safetyStatus
        }));
      }
    } catch (error) {
      console.log('Using simulated data - Flask backend not connected');
      // Fallback to simulated data if Flask isn't running
      setHealthData(prevData => ({
        ...prevData,
        heartRate: Math.floor(Math.random() * 20) + 65,
        temperature: (Math.random() * 2 + 97.5).toFixed(1),
        pillWeight: (prevData.pillWeight - Math.random() * 0.1).toFixed(1)
      }));
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchSensorData();

    // Set up real-time updates
    intervalRef.current = setInterval(fetchSensorData, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const addAlert = (message) => {
    const newAlert = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setHealthData(prevData => ({
      ...prevData,
      alerts: [newAlert, ...prevData.alerts.slice(0, 3)]
    }));
  };

  const sendCommand = async (command, data = {}) => {
    try {
      const response = await fetch('/api/commands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command, data })
      });
      
      if (response.ok) {
        const result = await response.json();
        addAlert(`${command} command executed successfully`);
        return result;
      }
    } catch (error) {
      console.error('Command failed:', error);
      addAlert(`${command} command failed`);
    }
  };

  return { healthData, addAlert, sendCommand };
};