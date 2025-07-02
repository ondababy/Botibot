import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Thermometer } from 'lucide-react';

const VitalsCard = ({ type, value, unit, status, icon: Icon, isAnimated = false }) => {
  const getGradientClass = () => {
    switch (type) {
      case 'heart':
        return 'gradient-text-error';
      case 'temperature':
        return 'gradient-text-success';
      default:
        return 'gradient-text';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'heart':
        return 'border-red-400';
      case 'temperature':
        return 'border-green-400';
      default:
        return 'border-blue-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-white rounded-2xl p-6 text-center border-t-4 ${getBorderColor()} shadow-xl relative overflow-hidden`}
    >
      <motion.div 
        className="absolute top-4 right-5 opacity-60"
        animate={isAnimated ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        <Icon className="w-6 h-6 text-gray-400" />
      </motion.div>

      <motion.div 
        className={`text-5xl font-black mb-2 ${getGradientClass()}`}
        key={value}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {value}{unit}
      </motion.div>

      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {type === 'heart' ? 'Heart Rate' : 'Body Temperature'}
      </div>

      <motion.div 
        className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {status}
      </motion.div>
    </motion.div>
  );
};

const VitalsSection = ({ healthData }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <VitalsCard
        type="heart"
        value={healthData.heartRate}
        unit=""
        status="Normal Range"
        icon={Heart}
        isAnimated={true}
      />
      <VitalsCard
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