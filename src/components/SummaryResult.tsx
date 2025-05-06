
import React, { useState } from 'react';
import { Share, Play, Pause, ExternalLink, Copy, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import YoutubePlayer from './YoutubePlayer';

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
  
  // Mock timeline chapters for demonstration
  const chapters = [
    { time: "0:00", title: "Introduction", position: 0 },
    { time: "5:32", title: "Main Topic", position: 20 },
    { time: "18:45", title: "Key Discussion", position: 50 },
    { time: "32:10", title: "Analysis", position: 70 },
    { time: "45:50", title: "Conclusion", position: 100 }
  ];
  
  const [activeChapter, setActiveChapter] = useState(0);
  
  const handleShareClick = () => {
    toast({
      title: "Link copied",
      description: "Summary link copied to clipboard",
      duration: 2000,
    });
  };
  
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
      className="w-full max-w-4xl mx-auto mb-16 border border-border rounded-2xl overflow-hidden bg-secondary/20 shadow-lg"
    >
      {/* Cover Banner */}
      <div 
        className="w-full h-56 relative"
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
      <div className="sticky top-[60px] z-10 bg-background/80 backdrop-blur-md px-4 py-4 border-y border-white/10">
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
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/60 hover:text-foreground hover:bg-white/5 btn-press rounded-full"
              onClick={handleShareClick}
              title="Copy link"
            >
              <Copy size={16} />
              <span className="sr-only">Copy link</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/60 hover:text-foreground hover:bg-white/5 btn-press rounded-full"
              onClick={handleShareClick}
              title="Share on Twitter"
            >
              <Twitter size={16} />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/60 hover:text-foreground hover:bg-white/5 btn-press rounded-full"
              onClick={handleShareClick}
              title="Share"
            >
              <ExternalLink size={16} />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Key Takeaways Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground/90">Key takeaways</h2>
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
        
        {/* Topic Sections */}
        {topicSections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topicSections.map((section, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  toast({
                    title: section.title,
                    description: "Section content would expand here in a modal",
                    duration: 3000,
                  });
                }}
              >
                <h3 className="text-alea-blue font-medium mb-1">{section.title}</h3>
                <p className="text-foreground/60 text-sm line-clamp-2">
                  {section.content.replace(/\*\*(.*?)\*\*/g, '$1')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SummaryResult;
