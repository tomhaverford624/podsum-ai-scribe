
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.svg 
            width="36" 
            height="28" 
            viewBox="0 0 40 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="transition-transform duration-300 group-hover:translate-x-1"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1
            }}
          >
            <motion.path 
              d="M18.923 2.083L1.923 30.083H6.641L23.641 2.083H18.923Z" 
              fill="#1677FF" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path 
              d="M33.923 2.083L27.923 12.083L25.513 8.083L30.795 0.083L38.641 0.083L23.641 24.083L18.923 24.083L28.833 8.083L33.923 2.083Z" 
              fill="#1677FF"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.svg>
        </motion.div>
        <div className="ml-2">
          <motion.div 
            className="font-bold text-alea-blue dark:text-blue-400 text-xl tracking-wide transition-colors"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >Alea</motion.div>
          <motion.div 
            className="uppercase text-[10px] tracking-wider text-alea-blue/80 dark:text-blue-400/80 transition-colors"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >RESEARCH</motion.div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
