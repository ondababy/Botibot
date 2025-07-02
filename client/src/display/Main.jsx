import React, { useState } from 'react';
import { useHealthData } from '../hooks/useHealthData';
import Header from '../components/Header';
import VitalsSection from '../components/VitalsCard';
import MedicationCard from '../components/MedicationCard';
import ControlPanel from '../components/ControlPanel';
import DispenseScreen from './Dispense';
import ScheduleScreen from './Schedule';

const Main = () => {
  const { healthData, addAlert } = useHealthData();
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'dispense', 'schedule'

  const handleControlAction = (action, label) => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
   
    addAlert(`${label} action initiated`);
   
    switch (action) {
      case 'emergency':
        console.log('Emergency protocol activated');
        break;
      case 'dispense':
        setCurrentScreen('dispense');
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  const handleNavigationAction = (action) => {
    switch (action) {
      case 'schedule':
        setCurrentScreen('schedule');
        break;
      case 'settings':
        console.log('Settings selected');
        break;
      case 'history':
        console.log('History selected');
        break;
      case 'inventory':
        console.log('Inventory selected');
        break;
      case 'call':
        console.log('Call selected');
        break;
      default:
        console.log(`${action} selected`);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  if (currentScreen === 'dispense') {
    return <DispenseScreen onBack={handleBackToDashboard} />;
  }

  if (currentScreen === 'schedule') {
    return <ScheduleScreen onBack={handleBackToDashboard} />;
  }

  return (
    <div className="dashboard-container">
      <div
        className="grid h-full relative z-10"
        style={{
          gridTemplateAreas: `
            "header header header header"
            "vitals vitals medication medication"
            "controls controls controls controls"
          `,
          gridTemplateRows: '60px 1fr 120px',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          padding: '12px',
          opacity: 1,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div style={{ gridArea: 'header' }}>
          <Header onNavigationAction={handleNavigationAction} />
        </div>
       
        <div style={{ gridArea: 'vitals' }}>
          <VitalsSection healthData={healthData} />
        </div>
       
        <div style={{ gridArea: 'medication' }}>
          <MedicationCard healthData={healthData} />
        </div>
       
        <div style={{ gridArea: 'controls' }}>
          <ControlPanel onAction={handleControlAction} />
        </div>
      </div>
    </div>
  );
};

export default Main;