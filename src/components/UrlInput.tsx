
import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isProcessing: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, isProcessing }) => {
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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex items-center relative">
        <Input
          type="url"
          placeholder="Paste YouTube podcast URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onPaste={handlePaste}
          className="pr-10 h-12 rounded-l-md shadow-sm border-r-0"
          disabled={isProcessing}
          autoFocus
        />
        {isValid !== null && (
          <div className="absolute right-24 top-1/2 transform -translate-y-1/2">
            {isValid ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
        <Button
          type="submit"
          disabled={!isValid || isProcessing}
          className={`h-12 rounded-l-none shadow-sm px-6 ${
            isProcessing ? 'bg-gray-400' : 'bg-alea-blue hover:bg-alea-blue/90'
          }`}
        >
          {isProcessing ? 'Processing...' : 'Summarize'}
        </Button>
      </div>
    </form>
  );
};

export default UrlInput;
