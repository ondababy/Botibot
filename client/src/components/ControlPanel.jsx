import React from 'react';
import { motion } from 'framer-motion';
import { Pill, AlertTriangle } from 'lucide-react';

const ControlButton = ({ icon: Icon, label, variant = 'default', onClick, index }) => {
  const getButtonStyles = () => {
    const baseStyles = {
      minHeight: '90px', // Reduced height
      fontSize: '13px',
      fontWeight: 700,
      letterSpacing: '0.5px',
      padding: '16px 12px',
      border: 'none',
      borderRadius: '16px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      textTransform: 'uppercase',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, var(--success-green) 0%, #458a6f 100%)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(82, 167, 136, 0.3)'
        };
      case 'emergency':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, var(--error-red) 0%, #a85a4a 100%)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(197, 112, 93, 0.3)'
        };
      default:
        return {
          ...baseStyles,
          background: 'var(--bamboo-cream-light)',
          border: '1.5px solid var(--bamboo-cream-dark)',
          color: 'var(--denim-blue-dark)',
          boxShadow: 'var(--shadow-sm)'
        };
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={getButtonStyles()}
    >
      <Icon className="w-5 h-5" style={{ strokeWidth: 2.5 }} />
      <span>{label}</span>
    </motion.button>
  );
};

const ControlPanel = ({ onAction }) => {
  const controls = [
    { icon: Pill, label: 'Dispense', variant: 'primary', action: 'dispense' },
    { icon: AlertTriangle, label: 'Emergency', variant: 'emergency', action: 'emergency' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      height: '100%',
      padding: '0 4px'
    }}>
      {controls.map((control, index) => (
        <ControlButton
          key={control.action}
          icon={control.icon}
          label={control.label}
          variant={control.variant}
          onClick={() => onAction(control.action, control.label)}
          index={index}
        />
      ))}
    </div>
  );
};

export default ControlPanel;