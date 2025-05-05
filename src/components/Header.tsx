
import React from 'react';
import Logo from './Logo';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="w-full py-4 px-6 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button variant="outline" className="font-medium text-sm">
            Login
          </Button>
          
          <Button className="bg-alea-blue hover:bg-alea-blue/90 font-medium text-sm">
            Join Free
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
