
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Separator } from './ui/separator';
import { ListCheck, BookOpen, Share2, Play, Pause, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
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
      transition={{ duration: 0.5 }}
      layout
    >
      {/* Cover Banner */}
      <div 
        className="w-full h-48 relative mb-4 rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${podcastInfo.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 backdrop-blur-sm"></div>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center">{podcastInfo.title}</h1>
        </div>
      </div>
      
      {/* YouTube Player */}
      {videoId && <YoutubePlayer videoId={videoId} />}
      
      {/* Timeline chapters - Sticky bar */}
      <div className="sticky top-12 z-10 bg-[#0b0f19]/80 backdrop-blur-md px-4 py-3 rounded-lg mb-4 border border-white/10">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm text-foreground/80 hover:text-foreground flex items-center gap-2 hover:bg-white/5"
            onClick={togglePlayback}
          >
            {isPlaying ? (
              <><Pause size={14} /> Pause</>
            ) : (
              <><Play size={14} /> Play</>
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
                >
                  <span className="sr-only">{chapter.title} - {chapter.time}</span>
                </button>
              ))}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-foreground/80 hover:text-foreground hover:bg-white/5"
            onClick={handleShareClick}
          >
            <Share size={14} className="mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <Card className="border-0 bg-transparent shadow-none">
        <CardContent className="space-y-6 pt-0 px-0">
          <Accordion type="single" collapsible defaultValue="key-takeaways" className="w-full">
            <AccordionItem value="key-takeaways" className="border-b border-white/10">
              <AccordionTrigger className="py-4 text-lg font-medium text-foreground/90 hover:no-underline hover:text-foreground">
                <div className="flex items-center">
                  <ListCheck size={18} className="mr-2 text-alea-blue" />
                  Key takeaways
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                <ul className="space-y-4 py-2">
                  {keyTakeaways.map((point, index) => (
                    <motion.li 
                      key={index} 
                      className="pl-6 relative"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <span className="absolute left-0 top-1 font-bold text-alea-blue">•</span>
                      <span 
                        className="text-foreground/70"
                        dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                      />
                    </motion.li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {topicSections.map((section, index) => (
              <AccordionItem key={index} value={`section-${index}`} className="border-b border-white/10">
                <AccordionTrigger className="py-4 text-lg font-medium text-foreground/90 hover:no-underline hover:text-foreground">
                  <div className="flex items-center">
                    <BookOpen size={18} className="mr-2 text-alea-blue" />
                    {section.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70">
                  <div 
                    className="leading-relaxed pl-6 py-2"
                    dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SummaryResult;
