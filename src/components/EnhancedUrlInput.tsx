
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Link, Headphones } from 'lucide-react';

interface EnhancedUrlInputProps {
  onSubmit: (url: string) => void;
  onDemoClick: () => void;
  isProcessing: boolean;
}

export const EnhancedUrlInput: React.FC<EnhancedUrlInputProps> = ({ 
  onSubmit, 
  onDemoClick, 
  isProcessing 
}) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateUrl = (value: string) => {
    // Simple YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(value);
  };

  useEffect(() => {
    if (url.trim() === '') {
      setIsValid(null);
      return;
    }
    setIsValid(validateUrl(url));
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isProcessing) {
      onSubmit(url);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');
    setUrl(pastedText);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex items-center relative bg-white/5 border border-white/10 rounded-full overflow-hidden">
        <div className="pl-4 pr-2">
          <Headphones className="h-5 w-5 text-foreground/50" />
        </div>
        
        <input
          type="url"
          placeholder="Paste a podcast link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onPaste={handlePaste}
          className="px-2 py-3 h-12 bg-transparent border-0 flex-1 text-foreground outline-none focus:ring-0"
          disabled={isProcessing}
          autoFocus
        />
        
        <button
          type="button"
          onClick={onDemoClick}
          className="text-alea-blue hover:text-alea-blue/80 text-sm px-3 py-2 transition-colors"
          disabled={isProcessing}
        >
          Try a sample
        </button>
        
        <Button
          type="submit"
          disabled={!isValid || isProcessing}
          className={`h-12 rounded-l-none px-6 ${
            isProcessing ? 'bg-gray-600' : 'bg-alea-blue hover:bg-alea-blue/90'
          } transition-transform duration-100 active:scale-97`}
        >
          Summarize
        </Button>
      </div>
    </form>
  );
};

export default EnhancedUrlInput;
