import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Thermometer } from 'lucide-react';

const CompactVitalsCard = ({ type, value, unit, status, icon: Icon, isAnimated = false }) => {
  const getAccentColor = () => {
    switch (type) {
      case 'heart':
        return '#c5705d';
      case 'temperature':
        return '#52a788';
      default:
        return '#5c7296';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{
        background: 'var(--white)',
        border: '1px solid var(--bamboo-cream-dark)',
        borderRadius: '20px',
        padding: '20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '140px'
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${getAccentColor()} 0%, transparent 100%)`
      }} />
      
      {/* Background icon */}
      <motion.div
        className="absolute top-3 right-3"
        animate={isAnimated ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ opacity: 0.15 }}
      >
        <Icon className="w-8 h-8" style={{ color: getAccentColor() }} />
      </motion.div>
      
      {/* Value */}
      <motion.div
        style={{ 
          fontSize: '32px',
          fontWeight: 800,
          color: getAccentColor(),
          lineHeight: 1,
          marginBottom: '6px'
        }}
        key={value}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {value}{unit}
      </motion.div>
      
      {/* Label */}
      <div style={{
        fontSize: '10px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: 'var(--text-light)',
        marginBottom: '8px'
      }}>
        {type === 'heart' ? 'Heart Rate' : 'Temperature'}
      </div>
      
      {/* Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '9px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          background: 'rgba(82, 167, 136, 0.1)',
          color: 'var(--success-green)',
          border: '1px solid rgba(82, 167, 136, 0.2)'
        }}
      >
        {status}
      </motion.div>
    </motion.div>
  );
};

const VitalsSection = ({ healthData }) => {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gap: '12px', 
      height: '100%' 
    }}>
      <CompactVitalsCard
        type="heart"
        value={healthData.heartRate}
        unit=""
        status="Normal"
        icon={Heart}
        isAnimated={true}
      />
      <CompactVitalsCard
        type="temperature"
        value={healthData.temperature}
        unit="°F"
        status="Healthy"
        icon={Thermometer}
      />
    </div>
  );
};

export default VitalsSection;