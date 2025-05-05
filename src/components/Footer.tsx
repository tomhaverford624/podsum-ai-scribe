
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p>© {new Date().getFullYear()} Alea Research. All rights reserved.</p>
          <p className="mt-1">We delete audio files after 24 hours.</p>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-700 transition-colors">Feedback</a>
        </div>
        
        <div className="mt-4 md:mt-0 text-xs">
          v1.0.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;
