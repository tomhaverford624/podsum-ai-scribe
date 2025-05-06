
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Separator } from './ui/separator';
import { ListCheck, BookOpen, Share2, Play, Pause, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

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
      title: "Ready to share!",
      description: "Summary card has been generated and copied to clipboard.",
    });
  };
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    
    toast({
      title: isPlaying ? "Paused" : "Playing summary audio",
      description: isPlaying ? "Audio playback paused" : "Playing audio summary of the podcast",
      duration: 2000,
    });
  };
  
  const handleChapterClick = (index: number) => {
    setActiveChapter(index);
    if (!isPlaying) setIsPlaying(true);
    
    toast({
      title: "Jumped to chapter",
      description: `Playing from "${chapters[index].title}"`,
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <Card className="summary-card w-full max-w-3xl mx-auto mt-8 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
        {podcastInfo && (
          <div className="relative overflow-hidden w-full h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <motion.img 
              src={podcastInfo.thumbnail} 
              alt={podcastInfo.title}
              className="w-full h-full object-cover opacity-90"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <motion.h2 
                className="text-xl md:text-2xl font-bold text-white p-6 line-clamp-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {podcastInfo.title}
              </motion.h2>
            </div>
          </div>
        )}

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

        <CardHeader className="bg-gradient-to-r from-alea-blue/10 to-alea-blue/5 dark:from-alea-blue/20 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 py-5">
          <CardTitle className="text-xl text-alea-blue dark:text-blue-400 flex items-center gap-2">
            <BookOpen size={20} />
            Podcast Summary
            
            <motion.div 
              className="ml-auto flex space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-full bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700"
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <><Pause size={14} className="mr-1" /> Pause</>
                ) : (
                  <><Play size={14} className="mr-1" /> Play</>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700"
                onClick={handleShareClick}
              >
                <Share2 size={14} />
              </Button>
            </motion.div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 py-6">
          <div>
            <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200 flex items-center">
              <ListCheck size={18} className="mr-2 text-alea-blue dark:text-blue-400" />
              Key Takeaways
            </h3>
            <ul className="space-y-4">
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
          </div>

          {topicSections.length > 0 && (
            <>
              <Separator className="my-4" />
              
              <div className="space-y-6">
                {topicSections.map((section, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200 flex items-center">
                      <BookOpen size={18} className="mr-2 text-alea-blue dark:text-blue-400" />
                      {section.title}
                    </h3>
                    <div 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6"
                      dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </CardContent>
        
        <CardFooter className="border-t border-gray-100 dark:border-gray-800 py-4 px-6 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm text-gray-500 hover:text-alea-blue flex items-center gap-2"
            onClick={togglePlayback}
          >
            <Volume2 size={14} />
            Listen to summary
          </Button>
          
          <AnimatePresence>
            {isPlaying && (
              <motion.div 
                className="flex items-center gap-2 text-xs text-gray-500"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="flex space-x-[2px]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] h-4 bg-alea-blue dark:bg-blue-400 rounded-full"
                      animate={{
                        height: [4, 12, 8, 16, 4],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                Now playing
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-gray-500 hover:text-alea-blue"
            onClick={handleShareClick}
          >
            <Share2 size={14} className="mr-1" />
            Share this summary
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SummaryResult;
