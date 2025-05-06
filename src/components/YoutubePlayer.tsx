
import React from 'react';
import { Card } from './ui/card';

interface YoutubePlayerProps {
  videoId: string;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId }) => {
  return (
    <Card className="w-full overflow-hidden border border-gray-100 dark:border-gray-800 mb-6">
      <div className="relative pb-[56.25%] h-0">
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          title="YouTube video player"
        />
      </div>
    </Card>
  );
};

export default YoutubePlayer;
