
import React from 'react';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface PodcastInfo {
  title: string;
  thumbnail: string;
  duration: string;
}

interface ProcessingFeedbackProps {
  podcastInfo: PodcastInfo;
  progress: number;
  currentStep: string;
  onCancel: () => void;
}

export const ProcessingFeedback: React.FC<ProcessingFeedbackProps> = ({
  podcastInfo,
  progress,
  currentStep,
  onCancel,
}) => {
  return (
    <Card className="summary-card w-full max-w-2xl mx-auto mt-8 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <img 
            src={podcastInfo.thumbnail} 
            alt={podcastInfo.title} 
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="ml-4 flex-1">
            <h3 className="font-semibold text-base line-clamp-1">{podcastInfo.title}</h3>
            <p className="text-sm text-gray-500">{podcastInfo.duration}</p>
            <div className="mt-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm font-medium">{currentStep}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 p-0 h-auto" 
                  onClick={onCancel}
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingFeedback;
