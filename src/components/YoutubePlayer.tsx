
import React from 'react';

interface YoutubePlayerProps {
  videoId: string;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl mb-4">
      <div className="relative pb-[56.25%] h-0">
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          title="YouTube video player"
        />
      </div>
    </div>
  );
};

export default YoutubePlayer;
