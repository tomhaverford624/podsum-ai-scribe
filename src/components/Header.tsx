
import React from 'react';
import Logo from './Logo';
import { Button } from './ui/button';
import { RotateCw } from 'lucide-react';

export const Header: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };
  
  return (
    <header className="w-full py-3 px-4 md:px-6 border-b border-border/40 bg-transparent backdrop-blur-sm z-10 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Reload"
          onClick={handleRefresh}
          className="rounded-full text-foreground/70 hover:text-foreground/90 hover:bg-white/5 btn-press"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
