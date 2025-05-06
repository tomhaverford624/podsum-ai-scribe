
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-6 mt-16 border-t border-white/5 bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs">
        <div className="mb-2 md:mb-0 text-center md:text-left">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Alea Research</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
