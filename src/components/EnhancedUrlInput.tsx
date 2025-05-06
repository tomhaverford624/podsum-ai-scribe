
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { CheckCircle, XCircle, Youtube, Link2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

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
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const items = e.dataTransfer.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'string' && items[i].type.match(/^text\/plain/)) {
          items[i].getAsString(text => {
            setUrl(text);
          });
          break;
        }
      }
    }

    const text = e.dataTransfer.getData('text');
    if (text) setUrl(text);
  };

  const handleInputClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full relative">
        <motion.div 
          className={`flex items-center relative rounded-full overflow-hidden shadow-md ${
            isDragging ? 'ring-2 ring-alea-blue' : ''
          }`}
          animate={{
            boxShadow: isDragging 
              ? "0 0 0 2px rgba(22, 119, 255, 0.3), 0 8px 16px rgba(0, 0, 0, 0.1)" 
              : "0 4px 12px rgba(0, 0, 0, 0.08)"
          }}
          whileHover={{
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)"
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div 
            className="flex-1 flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-l-full pl-6 pr-3 h-14 cursor-text relative"
            onClick={handleInputClick}
          >
            <Youtube className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
            
            <input
              ref={inputRef}
              type="url"
              placeholder="Drop or paste a link... we'll handle the rest"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onPaste={handlePaste}
              className="w-full h-full bg-transparent border-none outline-none text-base text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
              disabled={isProcessing}
              autoFocus
            />
            
            {isValid !== null && (
              <div className="ml-2">
                {isValid ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={!isValid || isProcessing}
            className={`h-14 rounded-r-full px-6 font-medium ${
              isProcessing 
                ? 'bg-gray-400' 
                : 'bg-alea-blue hover:bg-alea-blue/90'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Summarize'}
            {!isProcessing && <ArrowRight className="ml-1 h-4 w-4" />}
          </Button>
        </motion.div>
        
        <motion.div 
          className="mt-3 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={onDemoClick}
            className="text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700"
            disabled={isProcessing}
          >
            Try a demo link
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default EnhancedUrlInput;
