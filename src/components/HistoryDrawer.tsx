
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { History, Clock } from 'lucide-react';
import { Separator } from './ui/separator';
import { motion } from 'framer-motion';

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  thumbnail?: string;
}

interface HistoryDrawerProps {
  history: HistoryItem[];
  onSelect: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ history, onSelect }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="View history">
          <History size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md border-l border-gray-100 dark:border-gray-800">
        <SheetHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
          <SheetTitle className="flex items-center">
            <Clock size={18} className="mr-2 text-alea-blue dark:text-blue-400" />
            <span>Recent Summaries</span>
          </SheetTitle>
        </SheetHeader>
        
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <History size={40} className="text-gray-300 mb-4" />
            <p className="text-gray-500">No summaries yet</p>
            <p className="text-sm text-gray-400 mt-2">Summarized podcasts will appear here</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4 pr-2 overflow-y-auto max-h-[calc(100vh-120px)]">
            {history.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  className="flex items-start w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-left transition-all group border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                  onClick={() => onSelect(item.id)}
                >
                  {item.thumbnail && (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden mr-3 shadow-sm">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-alea-blue dark:group-hover:text-blue-400 transition-colors">{item.title}</h4>
                    <div className="flex items-center mt-1">
                      <Clock size={12} className="text-gray-400 mr-1" />
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                </button>
                <Separator className="mt-3" />
              </motion.div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default HistoryDrawer;
