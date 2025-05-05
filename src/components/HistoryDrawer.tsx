
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { History } from 'lucide-react';
import { Separator } from './ui/separator';

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
        <Button variant="ghost" size="icon" className="rounded-full">
          <History size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Recent Summaries</SheetTitle>
        </SheetHeader>
        
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <History size={40} className="text-gray-300 mb-4" />
            <p className="text-gray-500">No summaries yet</p>
            <p className="text-sm text-gray-400 mt-2">Summarized podcasts will appear here</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {history.map((item) => (
              <div key={item.id}>
                <button
                  className="flex items-start w-full p-2 hover:bg-gray-50 rounded-md text-left transition-colors"
                  onClick={() => onSelect(item.id)}
                >
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-10 h-10 rounded object-cover flex-shrink-0 mr-3"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </div>
                </button>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default HistoryDrawer;
