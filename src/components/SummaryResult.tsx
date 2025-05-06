
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { ListCheck, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopicSection {
  title: string;
  content: string;
}

interface SummaryResultProps {
  keyTakeaways: string[];
  topicSections?: TopicSection[];
}

export const SummaryResult: React.FC<SummaryResultProps> = ({
  keyTakeaways,
  topicSections = [],
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="summary-card w-full max-w-3xl mx-auto mt-8 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-alea-blue/10 to-alea-blue/5 dark:from-alea-blue/20 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 py-5">
          <CardTitle className="text-xl text-alea-blue dark:text-blue-400 flex items-center gap-2">
            <BookOpen size={20} />
            Podcast Summary
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
                <li key={index} className="pl-6 relative">
                  <span className="absolute left-0 top-1 font-bold text-alea-blue dark:text-blue-400">•</span>
                  <span 
                    className="text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {topicSections.length > 0 && (
            <>
              <Separator className="my-4" />
              
              <div className="space-y-6">
                {topicSections.map((section, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200 flex items-center">
                      <BookOpen size={18} className="mr-2 text-alea-blue dark:text-blue-400" />
                      {section.title}
                    </h3>
                    <div 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6"
                      dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SummaryResult;
