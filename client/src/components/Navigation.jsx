import React from 'react';
import { Settings, History, Package, Phone, Calendar, X } from 'lucide-react';

const NavigationMenu = ({ isOpen, onClose, onMenuAction }) => {
  const menuItems = [
    { icon: Settings, label: 'Settings', action: 'settings' },
    { icon: History, label: 'History', action: 'history' },
    { icon: Package, label: 'Inventory', action: 'inventory' },
    { icon: Phone, label: 'Call', action: 'call' },
    { icon: Calendar, label: 'Schedule', action: 'schedule' }
  ];

  const handleMenuAction = (action, label) => {
    console.log(`${label} selected`);
    onClose();
    if (onMenuAction) {
      onMenuAction(action);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="navigation-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Menu Panel */}
      <div
        className="navigation-menu-compact"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: isOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)',
          width: '380px',
          height: '400px',
          background: 'var(--bamboo-cream-light)',
          border: '1px solid var(--bamboo-cream-dark)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Menu Header with X button */}
        <div className="navigation-header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid var(--bamboo-cream-dark)',
          flexShrink: 0
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--denim-blue-dark)',
            margin: 0
          }}>
            Navigation
          </h3>
          
          <button
            className="close-button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              color: 'var(--text-light)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--error-red)';
              e.target.style.color = 'white';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--text-light)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items Layout */}
        <div className="navigation-items" style={{ 
          flex: 1, 
          padding: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Top Row - 2 items */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '12px'
          }}>
            {menuItems.slice(0, 2).map((item, index) => (
              <button
                key={item.action}
                onClick={() => handleMenuAction(item.action, item.label)}
                className="menu-item-compact"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '16px 12px',
                  background: 'var(--white)',
                  border: '1px solid var(--bamboo-cream-dark)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-dark)',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  height: '90px',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  animation: `slideInUp 0.3s ease ${index * 0.05}s forwards`
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--denim-blue)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'var(--white)';
                  e.target.style.color = 'var(--text-dark)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Middle Row - 2 items */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '12px'
          }}>
            {menuItems.slice(2, 4).map((item, index) => (
              <button
                key={item.action}
                onClick={() => handleMenuAction(item.action, item.label)}
                className="menu-item-compact"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '16px 12px',
                  background: 'var(--white)',
                  border: '1px solid var(--bamboo-cream-dark)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-dark)',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  height: '90px',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  animation: `slideInUp 0.3s ease ${(index + 2) * 0.05}s forwards`
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--denim-blue)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'var(--white)';
                  e.target.style.color = 'var(--text-dark)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Bottom Row - Schedule (Centered and Highlighted) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            {menuItems.slice(4, 5).map((item, index) => (
              <button
                key={item.action}
                onClick={() => handleMenuAction(item.action, item.label)}
                className="menu-item-compact schedule-highlight"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '16px 12px',
                  background: 'var(--white)',
                  border: '1px solid var(--bamboo-cream-dark)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-dark)',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  height: '90px',
                  width: '160px',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  animation: `slideInUp 0.3s ease ${(index + 4) * 0.05}s forwards`
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--success-green)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'var(--white)';
                  e.target.style.color = 'var(--text-dark)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;