
import React from 'react';
import Logo from './Logo';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <Logo />
      
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        
        <Button variant="outline" className="font-medium">
          Login
        </Button>
        
        <Button className="bg-alea-blue text-white hover:bg-alea-blue/90 font-medium">
          Join Free
        </Button>
      </div>
    </header>
  );
};

export default Header;
