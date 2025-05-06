
import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="w-full py-4 px-6 mt-auto border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Alea Research. All rights reserved.</p>
        </div>
        
        <div className="flex gap-6">
          <motion.a 
            href="#" 
            className="text-gray-500 hover:text-alea-blue dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            Privacy
          </motion.a>
          <motion.a 
            href="#" 
            className="text-gray-500 hover:text-alea-blue dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            Terms
          </motion.a>
          <motion.a 
            href="#" 
            className="text-gray-500 hover:text-alea-blue dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            Feedback
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
