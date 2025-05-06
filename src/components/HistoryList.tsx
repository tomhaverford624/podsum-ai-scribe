
import React, { useState } from 'react';
import { Clock, Calendar, ListMusic, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from './ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  thumbnail?: string;
  previewText?: string;
}

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (id: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  if (history.length === 0) {
    return (
      <motion.div 
        className="border rounded-lg p-6 text-center bg-white/50 backdrop-blur-sm dark:bg-gray-900/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center py-6">
          <ListMusic size={32} className="text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No Recent Summaries</h3>
          <p className="text-sm text-gray-500 mt-1">Your summarized podcasts will appear here</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 flex items-center">
          <Clock size={18} className="mr-2 text-alea-blue dark:text-blue-400" />
          Recent Summaries
        </h3>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="py-4">
          {history.map((item, index) => (
            <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.03, 
                  rotate: index % 2 === 0 ? 1 : -1, 
                  transition: { duration: 0.2 } 
                }}
                onHoverStart={() => setHoveredCardId(item.id)}
                onHoverEnd={() => setHoveredCardId(null)}
              >
                <button
                  onClick={() => onSelect(item.id)}
                  className="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex flex-col group bg-white dark:bg-gray-900 rounded-[16px] overflow-hidden shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 relative"
                  style={{
                    transform: "perspective(1000px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {item.thumbnail && (
                    <div className="relative w-full h-32 overflow-hidden">
                      <motion.img
                        src={item.thumbnail}
                        alt={item.title}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          hoveredCardId === item.id ? 'scale-110 blur-[2px]' : 'scale-100'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {hoveredCardId === item.id && item.previewText && (
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center p-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-white text-sm text-center font-medium backdrop-blur-sm bg-black/20 p-2 rounded">
                            Key takeaway: {item.previewText || "Institutional investors are piling in"}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-alea-blue dark:group-hover:text-blue-400 transition-colors mb-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center">
                        <Calendar size={12} className="text-gray-400 mr-1" />
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <motion.span 
                        className="text-alea-blue dark:text-blue-400 p-1 rounded-full border border-alea-blue/30 dark:border-blue-400/30 group-hover:bg-alea-blue/10 dark:group-hover:bg-blue-400/10 transition-colors"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ArrowRight size={14} />
                      </motion.span>
                    </div>
                  </div>
                </button>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex">
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default HistoryList;
