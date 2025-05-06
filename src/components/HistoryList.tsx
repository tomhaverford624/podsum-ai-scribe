
import React from 'react';
import { Clock, Calendar, ListMusic } from 'lucide-react';
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
    <div className="border rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <Clock size={16} className="mr-2 text-alea-blue dark:text-blue-400" />
          Recent Summaries
        </h3>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[300px] overflow-y-auto">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <button
              onClick={() => onSelect(item.id)}
              className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-start group"
            >
              {item.thumbnail && (
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mr-3 shadow-sm">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-alea-blue dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center mt-1">
                  <Calendar size={12} className="text-gray-400 mr-1" />
                  <p className="text-xs text-gray-500">{item.date}</p>
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
