import React from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Gauge, Smartphone, RotateCcw } from 'lucide-react';

const SafetyItem = ({ icon: Icon, label, status, index }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
      case 'clear':
      case 'stable':
      case 'connected':
        return 'bg-green-500 shadow-green-500/50';
      case 'warning':
        return 'bg-yellow-500 shadow-yellow-500/50';
      case 'error':
        return 'bg-red-500 shadow-red-500/50';
      default:
        return 'bg-green-500 shadow-green-500/50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 2 }}
      className="flex justify-between items-center p-3 bg-white rounded-xl border-l-4 border-green-500 shadow-md hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-600" />
        <span className="text-xs font-semibold text-gray-700">{label}</span>
      </div>
      <motion.div 
        className={`w-3 h-3 rounded-full ${getStatusColor()}`}
        animate={{ 
          boxShadow: [
            '0 0 5px rgba(34, 197, 94, 0.5)',
            '0 0 15px rgba(34, 197, 94, 0.8)',
            '0 0 5px rgba(34, 197, 94, 0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

const SafetyPanel = ({ healthData }) => {
  const safetyItems = [
    { icon: User, label: 'Face Recognition', status: healthData.safetyStatus.faceRecognition },
    { icon: Gauge, label: 'Alcohol Detection', status: healthData.safetyStatus.alcoholDetection },
    { icon: RotateCcw, label: 'Height Sensor', status: healthData.safetyStatus.heightSensor },
    { icon: RotateCcw, label: 'Orientation', status: healthData.safetyStatus.orientation },
    { icon: Smartphone, label: 'GSM Connection', status: healthData.safetyStatus.gsmConnection }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-5 flex flex-col gap-3 relative z-10"
    >
      <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
        <Shield className="w-4 h-4" />
        Safety Systems
      </div>

      <div className="space-y-2">
        {safetyItems.map((item, index) => (
          <SafetyItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            status={item.status}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SafetyPanel;