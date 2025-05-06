
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Separator } from './ui/separator';
import { ListCheck, BookOpen, Share2, Play, Pause } from 'lucide-react';
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
      title: "Summary ready to share",
      description: "Summary has been copied to clipboard.",
    });
  };
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    
    toast({
      title: isPlaying ? "Paused" : "Playing summary",
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

  // Extract YouTube video ID from URL if present
  const extractVideoId = (url?: string): string | undefined => {
    if (!url) return undefined;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : undefined;
  };

  const videoId = podcastInfo?.videoId || extractVideoId(podcastInfo?.thumbnail);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <Card className="summary-card w-full max-w-3xl mx-auto mt-8 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
        {podcastInfo && (
          <CardHeader className="bg-gradient-to-r from-alea-blue/10 to-alea-blue/5 dark:from-alea-blue/20 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 p-5">
            <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
              {podcastInfo.title}
            </CardTitle>
          </CardHeader>
        )}

        {/* YouTube Player */}
        {videoId && <YoutubePlayer videoId={videoId} />}

        {/* Timeline chapters */}
        <div className="relative px-6 pt-4 pb-0 flex items-center overflow-x-auto scrollbar-none">
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full absolute left-6 right-6"></div>
          <div className="w-full flex justify-between relative z-10">
            {chapters.map((chapter, index) => (
              <motion.button
                key={index}
                className="flex flex-col items-center cursor-pointer group z-10 px-2"
                onClick={() => handleChapterClick(index)}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className={`w-3 h-3 rounded-full mb-2 ${
                    index <= activeChapter ? 'bg-alea-blue dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  animate={{ 
                    scale: index === activeChapter ? [1, 1.2, 1] : 1,
                    backgroundColor: index <= activeChapter ? '#1677FF' : '#d1d5db' 
                  }}
                  transition={{ duration: 0.5, repeat: index === activeChapter ? Infinity : 0, repeatType: "reverse" }}
                />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-6 whitespace-nowrap text-xs font-medium">
                  <span className="text-alea-blue dark:text-blue-400">{chapter.time}</span>
                  <span className="ml-1 text-gray-500">{chapter.title}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        
        <CardContent className="space-y-6 py-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="key-takeaways" className="border-none">
              <AccordionTrigger className="py-2 text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
                <ListCheck size={18} className="mr-2 text-alea-blue dark:text-blue-400" />
                Key Takeaways
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 mt-2">
                  {keyTakeaways.map((point, index) => (
                    <motion.li 
                      key={index} 
                      className="pl-6 relative"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <span className="absolute left-0 top-1 font-bold text-alea-blue dark:text-blue-400">•</span>
                      <span 
                        className="text-gray-700 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                      />
                    </motion.li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {topicSections.map((section, index) => (
              <AccordionItem key={index} value={`section-${index}`} className="border-none">
                <AccordionTrigger className="py-2 text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
                  <BookOpen size={18} className="mr-2 text-alea-blue dark:text-blue-400" />
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div 
                    className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6 mt-2"
                    dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        
        <CardFooter className="border-t border-gray-100 dark:border-gray-800 py-4 px-6 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm text-gray-500 hover:text-alea-blue flex items-center gap-2"
            onClick={togglePlayback}
          >
            {isPlaying ? (
              <><Pause size={14} /> Pause</>
            ) : (
              <><Play size={14} /> Play summary</>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-gray-500 hover:text-alea-blue"
            onClick={handleShareClick}
          >
            <Share2 size={14} className="mr-1" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SummaryResult;
