import React from 'react';
import { motion } from 'framer-motion';
import { 
  Pill, 
  Phone, 
  Printer, 
  AlertTriangle, 
  Settings, 
  BarChart3, 
  Volume2, 
  Camera 
} from 'lucide-react';

const ControlButton = ({ icon: Icon, label, variant = 'default', onClick, index }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'emergency':
        return 'bg-gradient-to-br from-red-500 to-red-700 text-white border-red-400 hover:from-red-600 hover:to-red-800 shadow-red-500/30';
      case 'primary':
        return 'bg-gradient-to-br from-green-500 to-green-700 text-white border-green-400 hover:from-green-600 hover:to-green-800 shadow-green-500/30';
      default:
        return 'bg-white text-blue-700 border-blue-300 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-800 hover:text-white shadow-blue-500/20';
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${getVariantStyles()}
        p-3 rounded-2xl border-2 font-bold text-xs uppercase tracking-wide
        min-h-[70px] flex flex-col items-center justify-center gap-2
        transition-all duration-300 shadow-lg hover:shadow-xl
        relative overflow-hidden group
      `}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <Icon className="w-5 h-5 drop-shadow-sm relative z-10" />
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
};

const ControlPanel = ({ onAction }) => {
  const controls = [
    { icon: Pill, label: 'Dispense', variant: 'primary', action: 'dispense' },
    { icon: Phone, label: 'Call', variant: 'default', action: 'call' },
    { icon: Printer, label: 'Print', variant: 'default', action: 'print' },
    { icon: AlertTriangle, label: 'Emergency', variant: 'emergency', action: 'emergency' },
    { icon: Settings, label: 'Settings', variant: 'default', action: 'settings' },
    { icon: BarChart3, label: 'History', variant: 'default', action: 'history' },
    { icon: Volume2, label: 'Audio', variant: 'default', action: 'audio' },
    { icon: Camera, label: 'Camera', variant: 'default', action: 'camera' }
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
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