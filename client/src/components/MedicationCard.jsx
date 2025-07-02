import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Clock } from 'lucide-react';

const MedicationCard = ({ healthData }) => {
  const nextMedication = {
    name: "Aspirin",
    dosage: "100mg",
    time: "2:00 PM",
    remaining: "14 pills"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        background: 'var(--white)',
        border: '1px solid var(--bamboo-cream-dark)',
        borderRadius: '20px',
        padding: '20px',
        height: '100%',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, var(--denim-blue) 0%, var(--denim-blue-light) 100%)'
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--denim-blue) 0%, var(--denim-blue-dark) 100%)',
          borderRadius: '10px',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Pill className="w-4 h-4 text-white" />
        </div>
        <span style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--denim-blue-dark)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Next Medication
        </span>
      </div>

      {/* Content - Centered Layout */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        minHeight: '120px'
      }}>
        {/* Medication Name */}
        <div style={{
          fontSize: '24px',
          fontWeight: 800,
          color: 'var(--denim-blue-dark)',
          marginBottom: '4px',
          lineHeight: 1
        }}>
          {nextMedication.name}
        </div>
        
        {/* Dosage */}
        <div style={{
          fontSize: '14px',
          color: 'var(--text-light)',
          marginBottom: '16px',
          fontWeight: 500
        }}>
          {nextMedication.dosage}
        </div>

        {/* Time with enhanced styling */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(82, 167, 136, 0.1)',
          padding: '10px 16px',
          borderRadius: '16px',
          border: '1px solid rgba(82, 167, 136, 0.2)',
          marginBottom: '12px'
        }}>
          <Clock className="w-4 h-4" style={{ color: 'var(--success-green)' }} />
          <span style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--success-green)'
          }}>
            {nextMedication.time}
          </span>
        </div>

        {/* Pills remaining */}
        <div style={{
          fontSize: '11px',
          color: 'var(--text-light)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 500
        }}>
          {nextMedication.remaining} remaining
        </div>
      </div>
    </motion.div>
  );
};

export default MedicationCard;