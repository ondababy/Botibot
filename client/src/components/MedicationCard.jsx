import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Scale } from 'lucide-react';

const MedicationCard = ({ healthData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-5 flex flex-col gap-4 relative z-10"
    >
      <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
        <Pill className="w-4 h-4" />
        Medication Schedule
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl p-5 text-center border-t-4 border-blue-500 shadow-lg"
      >
        <motion.div 
          className="text-3xl font-black gradient-text mb-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {healthData.nextMedication.time}
        </motion.div>
        <div className="text-sm text-gray-600 mb-3 font-medium">
          {healthData.nextMedication.name}
        </div>
        <motion.div 
          className="inline-block bg-amber-50 text-blue-700 text-xs font-semibold px-3 py-2 rounded-xl border border-amber-200"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Next dose in {healthData.nextMedication.countdown}
        </motion.div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl p-4 text-center border-2 border-blue-300 shadow-lg"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Scale className="w-4 h-4 text-gray-500" />
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Current Weight
          </div>
        </div>
        <motion.div 
          className="text-2xl font-black gradient-text mb-2"
          key={healthData.pillWeight}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
        >
          {healthData.pillWeight}g
        </motion.div>
        <div className="inline-block bg-amber-50 text-gray-600 text-xs px-2 py-1 rounded-lg">
          ≈ {healthData.pillCount} pills remaining
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MedicationCard;