
import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="w-full py-3 px-6 mt-auto border-t border-white/10 bg-transparent backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs">
        <div className="mb-2 md:mb-0 text-center md:text-left">
          <p className="text-foreground/50">© {new Date().getFullYear()} Alea Research</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
