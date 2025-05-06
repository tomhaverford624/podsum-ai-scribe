
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Copy, Download, Send, Share, ListCheck, BookOpen } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleCopy = () => {
    const content = `
# Key Takeaways
${keyTakeaways.map(point => `• ${point}`).join('\n')}

${topicSections.map(section => `# ${section.title}\n${section.content}`).join('\n\n')}
    `;
    
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "The summary has been copied in Markdown format",
    });
  };

  const handleDownload = () => {
    const content = `
# Key Takeaways
${keyTakeaways.map(point => `• ${point}`).join('\n')}

${topicSections.map(section => `# ${section.title}\n${section.content}`).join('\n\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'podcast-summary.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendToGDocs = () => {
    toast({
      title: "Feature coming soon",
      description: "Send to Google Docs feature will be available soon.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Feature coming soon",
      description: "Share link feature will be available soon.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="summary-card w-full max-w-3xl mx-auto mt-8 overflow-hidden border border-gray-100 dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-xl text-alea-blue dark:text-blue-400">Podcast Summary</CardTitle>
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
        <CardFooter className="flex justify-between border-t pt-4 bg-gray-50/50 dark:bg-gray-800/20 px-6 py-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="text-xs">
              <Copy size={14} className="mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs">
              <Download size={14} className="mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleSendToGDocs} className="text-xs">
              <Send size={14} className="mr-1" />
              Send to Docs
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={handleShare} className="text-xs">
            <Share size={14} className="mr-1" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SummaryResult;
