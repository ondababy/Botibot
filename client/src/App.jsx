import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Main from './display/Main';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  // Kiosk mode optimizations
  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    const disableSelection = (e) => e.preventDefault();
    
    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('selectstart', disableSelection);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('selectstart', disableSelection);
    };
  }, []);

  const handleNavigation = (view) => {
    switch (view) {
      case 'settings':
        setShowSettings(true);
        break;
      default:
        console.log(`Navigate to: ${view}`);
    }
  };

  return (
    <>
      <Main onNavigate={handleNavigation} />
      
      <AnimatePresence>
        {showSettings && (
          <div>Settings Overlay (implement when needed)</div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;