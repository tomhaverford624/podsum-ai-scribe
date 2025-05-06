
import React from 'react';
import Logo from './Logo';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-10 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
