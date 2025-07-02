import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock } from 'lucide-react';

const AlertItem = ({ alert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 2 }}
      className="bg-white p-3 mb-2 rounded-xl border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-all duration-200"
    >
      <div className="font-semibold text-gray-800 text-xs mb-1">
        {alert.message}
      </div>
      <div className="flex items-center gap-1">
        <Clock className="w-3 h-3 text-gray-400" />
        <span className="text-gray-500 text-xs bg-amber-50 px-2 py-1 rounded-md">
          {alert.time}
        </span>
      </div>
    </motion.div>
  );
};

const AlertsPanel = ({ healthData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 flex flex-col relative z-10 h-full"
    >
      <div className="flex items-center gap-2 text-white font-bold text-sm mb-4">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Bell className="w-4 h-4" />
        </motion.div>
        System Alerts
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-blue-400">
        <AnimatePresence>
          {healthData.alerts.map((alert, index) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AlertsPanel;