
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 mt-auto border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Alea Research. All rights reserved.</p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">We delete audio files after 24 hours.</p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-alea-blue dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm">Privacy</a>
          <a href="#" className="text-gray-500 hover:text-alea-blue dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm">Terms</a>
          <a href="#" className="text-gray-500 hover:text-alea-blue dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm">Feedback</a>
        </div>
        
        <div className="mt-4 md:mt-0 text-xs text-gray-400 dark:text-gray-500">
          v1.0.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;
