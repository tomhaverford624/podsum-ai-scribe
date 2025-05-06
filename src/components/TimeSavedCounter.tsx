
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimeSavedCounterProps {
  summaryCount: number;
}

export const TimeSavedCounter: React.FC<TimeSavedCounterProps> = ({ summaryCount }) => {
  // Assume an average podcast is 60 minutes and reading a summary takes 5 minutes
  const minutesSavedPerSummary = 55;
  const totalMinutesSaved = summaryCount * minutesSavedPerSummary;
  
  const hours = Math.floor(totalMinutesSaved / 60);
  const minutes = totalMinutesSaved % 60;
  
  const [animatedHours, setAnimatedHours] = useState(0);
  const [animatedMinutes, setAnimatedMinutes] = useState(0);
  
  useEffect(() => {
    // Animate the counter
    const duration = 1500; // ms
    const steps = 20;
    const incrementH = hours / steps;
    const incrementM = minutes / steps;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      setAnimatedHours(Math.min(Math.floor(incrementH * step), hours));
      setAnimatedMinutes(Math.min(Math.floor(incrementM * step), minutes));
      
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [hours, minutes]);
  
  return (
    <motion.div 
      className="flex items-center justify-center mt-4 text-center text-gray-600 dark:text-gray-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 flex items-center">
        <Clock className="h-4 w-4 text-alea-blue dark:text-blue-400 mr-2" />
        <span className="text-sm">
          You've saved <span className="font-semibold text-alea-blue dark:text-blue-400">
            {animatedHours} h {animatedMinutes} m
          </span> of listening time
        </span>
      </div>
    </motion.div>
  );
};

export default TimeSavedCounter;
