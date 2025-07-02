import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Wifi } from 'lucide-react';

const Header = () => {
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 flex justify-between items-center shadow-lg border border-white/20"
    >
      <motion.div 
        className="flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
          <Heart className="w-4 h-4 text-white" />
        </div>
        <span className="text-xl font-bold text-blue-700">HealthBot Pro</span>
      </motion.div>

      <motion.div 
        className="bg-amber-50 px-4 py-2 rounded-full border border-amber-200"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-sm font-medium text-gray-700">{currentTime}</span>
      </motion.div>

      <motion.div 
        className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div 
          className="w-3 h-3 bg-green-500 rounded-full shadow-lg"
          animate={{ 
            boxShadow: [
              '0 0 5px rgba(34, 197, 94, 0.5)',
              '0 0 15px rgba(34, 197, 94, 0.8)',
              '0 0 5px rgba(34, 197, 94, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-xs font-semibold text-green-700">System Online</span>
      </motion.div>
    </motion.div>
  );
};

export default Header;