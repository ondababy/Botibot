import React from 'react';
import { motion } from 'framer-motion';
import { useHealthData } from '../hooks/useHealthData';
import Header from '../components/Header';
import VitalsSection from '../components/VitalsCard';
import MedicationCard from '../components/MedicationCard';
import SafetyPanel from '../components/SafetyPanel';
import ControlPanel from '../components/ControlPanel';
import AlertsPanel from '../components/AlertsPanel';

const Main = () => {
  const { healthData, addAlert } = useHealthData();

  const handleControlAction = (action, label) => {
    // Add haptic feedback for touch devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Add alert for user actions
    addAlert(`${label} action initiated`);

    // Handle specific actions
    switch (action) {
      case 'emergency':
        console.log('Emergency protocol activated');
        // Add emergency logic here
        break;
      case 'dispense':
        console.log('Dispensing medication');
        // Add medication dispensing logic here
        break;
      case 'call':
        console.log('Calling caregiver');
        // Add call logic here
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  return (
    <div className="dashboard-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-4 grid-rows-3 gap-3 p-3 h-full relative z-10"
            style={{
            gridTemplateAreas: `
                "header header header header"
                "vitals vitals medication medication"
                "controls controls controls controls"
            `,
            gridTemplateRows: '55px 265px 160px'
            }}
      >
        {/* Header */}
        <div style={{ gridArea: 'header' }}>
          <Header />
        </div>

        {/* Vitals */}
        <div style={{ gridArea: 'vitals' }}>
          <VitalsSection healthData={healthData} />
        </div>

        {/* Medication */}
        <div style={{ gridArea: 'medication' }}>
          <MedicationCard healthData={healthData} />
        </div>

        {/* Safety */}
        {/* <div style={{ gridArea: 'safety' }}>
          <SafetyPanel healthData={healthData} />
        </div> */}

        {/* Controls */}
        <div style={{ gridArea: 'controls' }}>
          <ControlPanel onAction={handleControlAction} />
        </div>

        {/* Alerts */}
        {/* <div style={{ gridArea: 'alerts' }}>
          <AlertsPanel healthData={healthData} />
        </div> */}
      </motion.div>
    </div>
  );
};

export default Main;