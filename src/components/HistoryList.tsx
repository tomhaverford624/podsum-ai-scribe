
import React from 'react';
import { Clock, Calendar, ListMusic, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from './ui/separator';

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  thumbnail?: string;
}

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (id: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="border rounded-lg p-6 text-center bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
        <div className="flex flex-col items-center justify-center py-6">
          <ListMusic size={32} className="text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No Recent Summaries</h3>
          <p className="text-sm text-gray-500 mt-1">Your summarized podcasts will appear here</p>
        </div>
      </div>
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[350px] overflow-y-auto pr-2">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <button
              onClick={() => onSelect(item.id)}
              className="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex flex-col group bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
            >
              {item.thumbnail && (
                <div className="relative w-full h-32 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
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
                  <span className="text-alea-blue dark:text-blue-400 p-1 rounded-full border border-alea-blue/30 dark:border-blue-400/30 group-hover:bg-alea-blue/10 dark:group-hover:bg-blue-400/10 transition-colors">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
