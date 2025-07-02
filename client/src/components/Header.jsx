import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import NavigationMenu from './Navigation';

const Header = ({ onNavigationAction }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleMenuAction = (action) => {
    setIsMenuOpen(false);
    if (onNavigationAction) {
      onNavigationAction(action);
    }
  };

  return (
    <>
      <div
        className="glass-card"
        style={{
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          position: 'relative',
          zIndex: 1000,
          opacity: 1,
          transition: 'opacity 0.3s ease'
        }}
      >
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hamburger-button"
          style={{
            background: 'transparent',
            border: 'none',
            padding: '12px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            minWidth: '44px',
            minHeight: '44px'
          }}
        >
          <div style={{ 
            transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}>
            {isMenuOpen ? (
              <X className="w-6 h-6" style={{ color: 'var(--denim-blue-dark)' }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: 'var(--denim-blue-dark)' }} />
            )}
          </div>
        </button>

        {/* Logo */}
        <div className="logo-container" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          transition: 'transform 0.2s ease' 
        }}>
          <div className="logo-icon">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="logo-text">BOTIBOT</span>
        </div>

        {/* Time Display */}
        <div className="header-badge">
          {currentTime}
        </div>

        {/* System Status */}
        <div className="header-badge system-status">
          <div
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#52a788',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}
          />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Online</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onMenuAction={handleMenuAction}
      />
    </>
  );
};

export default Header;