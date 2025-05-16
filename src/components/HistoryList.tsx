
import React, { useState } from 'react';
import { Clock, Calendar, Play, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';

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
        className="border border-border rounded-2xl p-8 text-center bg-secondary/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center justify-center py-8">
          <Clock size={28} className="text-foreground/30 mb-4" />
          <h3 className="text-xl font-medium text-foreground/90 mb-2">No summaries yet</h3>
          <p className="text-base text-foreground/70">Paste a link to see the magic</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-xl text-foreground/90 flex items-center">
          <Clock size={20} className="mr-2 text-alea-blue" />
          Recent summaries
        </h3>
        <Link to="/podcasts">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-alea-blue">
            <span>See more</span>
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative group"
      >
        <CarouselContent className="-ml-4 py-2">
          {history.map((item, index) => (
            <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  translateY: -4,
                  transition: { duration: 0.2 } 
                }}
                onHoverStart={() => setHoveredCardId(item.id)}
                onHoverEnd={() => setHoveredCardId(null)}
              >
                <button
                  onClick={() => onSelect(item.id)}
                  className="w-full text-left transition-all flex flex-col group relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-white/10 aspect-square bg-secondary/20"
                >
                  {item.thumbnail && (
                    <div className="w-full h-full overflow-hidden relative">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      
                      {/* Play icon on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="font-medium text-white line-clamp-2 text-base mb-2">
                          {item.title}
                        </h4>
                        <div className="flex items-center">
                          <Calendar size={12} className="text-white/70 mr-1" />
                          <p className="text-xs text-white/70">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden group-hover:flex absolute -left-12 glass-btn border-0" />
        <CarouselNext className="hidden group-hover:flex absolute -right-12 glass-btn border-0" />
      </Carousel>
    </div>
  );
};

export default HistoryList;
