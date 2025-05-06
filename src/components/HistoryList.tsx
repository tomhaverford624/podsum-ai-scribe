
import React, { useState } from 'react';
import { Clock, Calendar, ListMusic, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from './ui/separator';
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
                  scale: 1.05,
                  transition: { duration: 0.2 } 
                }}
                onHoverStart={() => setHoveredCardId(item.id)}
                onHoverEnd={() => setHoveredCardId(null)}
              >
                <button
                  onClick={() => onSelect(item.id)}
                  className="w-full text-left transition-all flex flex-col group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 aspect-square"
                >
                  {item.thumbnail && (
                    <div className="w-full h-full overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="font-semibold text-white line-clamp-2 text-sm md:text-base mb-1">
                          {item.title}
                        </h4>
                        <div className="flex items-center">
                          <Calendar size={12} className="text-gray-300 mr-1" />
                          <p className="text-xs text-gray-300">{item.date}</p>
                        </div>
                        
                        <div className="mt-3 flex justify-end">
                          <motion.span 
                            className="text-white p-1 rounded-full border border-white/30 group-hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <ArrowRight size={14} />
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  )}
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
