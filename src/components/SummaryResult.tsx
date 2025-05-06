
import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import YoutubePlayer from './YoutubePlayer';
import { Separator } from './ui/separator';

interface TopicSection {
  title: string;
  content: string;
}

interface SummaryResultProps {
  keyTakeaways: string[];
  topicSections?: TopicSection[];
  podcastInfo?: {
    title: string;
    thumbnail: string;
    duration?: string;
    videoId?: string;
  };
}

export const SummaryResult: React.FC<SummaryResultProps> = ({
  keyTakeaways,
  topicSections = [],
  podcastInfo,
}) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>("1×");
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  
  // Mock timeline chapters for demonstration
  const chapters = [
    { time: "0:00", title: "Introduction", position: 0 },
    { time: "5:32", title: "Main Topic", position: 20 },
    { time: "18:45", title: "Key Discussion", position: 50 },
    { time: "32:10", title: "Analysis", position: 70 },
    { time: "45:50", title: "Conclusion", position: 100 }
  ];
  
  const [activeChapter, setActiveChapter] = useState(0);
  
  const speedOptions = ["0.75×", "1×", "1.25×", "1.5×", "2×"];
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    
    toast({
      title: isPlaying ? "Paused" : "Playing",
      description: isPlaying ? "Audio paused" : "Playing audio summary",
      duration: 2000,
    });
  };
  
  const handleChapterClick = (index: number) => {
    setActiveChapter(index);
    if (!isPlaying) setIsPlaying(true);
    
    toast({
      title: "Chapter selected",
      description: `Playing from "${chapters[index].title}"`,
      duration: 2000,
    });
  };
  
  const handleSpeedChange = (speed: string) => {
    setPlaybackSpeed(speed);
    setShowSpeedOptions(false);
    
    toast({
      title: "Playback speed",
      description: `Speed changed to ${speed}`,
      duration: 2000,
    });
  };

  const extractVideoId = (url?: string): string | undefined => {
    if (!url) return undefined;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : undefined;
  };

  const videoId = podcastInfo?.videoId || extractVideoId(podcastInfo?.thumbnail);

  if (!podcastInfo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto mb-16 border border-[#1c212d] rounded-2xl overflow-hidden bg-secondary/10 shadow-lg"
    >
      {/* Cover Banner */}
      <div 
        className="w-full h-[280px] relative"
        style={{
          backgroundImage: `url(${podcastInfo.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center">{podcastInfo.title}</h1>
        </div>
      </div>
      
      {/* YouTube Player */}
      {videoId && <YoutubePlayer videoId={videoId} />}
      
      {/* Timeline chapters - Sticky bar */}
      <div className="sticky top-[60px] z-10 bg-background/95 backdrop-blur-md px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm text-foreground/80 hover:text-foreground flex items-center gap-2 hover:bg-white/5 btn-press"
            onClick={togglePlayback}
          >
            {isPlaying ? (
              <><Pause size={16} /> <span>Pause summary</span></>
            ) : (
              <><Play size={16} /> <span>Play summary</span></>
            )}
          </Button>
          
          <div className="relative flex-1 chapter-timeline">
            <div className="chapter-progress" style={{ width: `${chapters[activeChapter].position}%` }}></div>
            <div className="flex justify-between relative z-10">
              {chapters.map((chapter, index) => (
                <button
                  key={index}
                  className={`chapter-marker ${index <= activeChapter ? 'active' : ''}`}
                  onClick={() => handleChapterClick(index)}
                  aria-label={`Jump to ${chapter.title} at ${chapter.time}`}
                  title={`${chapter.title} - ${chapter.time}`}
                >
                  <span className="sr-only">{chapter.title} - {chapter.time}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Playback Speed Control */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-sm py-1 px-2 h-auto text-alea-blue hover:text-alea-blue/70 hover:bg-white/5 btn-press"
              onClick={() => setShowSpeedOptions(!showSpeedOptions)}
            >
              {playbackSpeed}
            </Button>
            
            {showSpeedOptions && (
              <div className="absolute top-full mt-1 right-0 z-20 bg-background/95 backdrop-blur-md border border-white/10 rounded-md shadow-lg overflow-hidden">
                {speedOptions.map((speed) => (
                  <button
                    key={speed}
                    className={`block w-full text-left px-4 py-2 text-sm ${speed === playbackSpeed ? 'bg-white/10 text-alea-blue' : 'hover:bg-white/5 text-foreground/80'}`}
                    onClick={() => handleSpeedChange(speed)}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content sections in continuous flow */}
      <div className="p-6 md:p-8">
        {/* Key Takeaways Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-alea-blue">Key takeaways</h2>
          <ul className="space-y-4">
            {keyTakeaways.map((point, index) => (
              <motion.li 
                key={index} 
                className="pl-6 relative text-lg"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="absolute left-0 top-1.5 text-alea-blue">•</span>
                <span 
                  className="text-foreground/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* Separator between sections */}
        <Separator className="my-8 bg-white/10" />
        
        {/* Topic Sections in linear layout */}
        {topicSections.map((section, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-alea-blue">{section.title}</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-foreground/80 leading-relaxed">
                {section.content.replace(/\*\*(.*?)\*\*/g, '$1')}
              </p>
            </div>
            {index < topicSections.length - 1 && (
              <Separator className="my-8 bg-white/10" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SummaryResult;
