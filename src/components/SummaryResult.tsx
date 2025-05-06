
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Copy, Download, Send, Share } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { motion } from 'framer-motion';

interface TimestampedChapter {
  timestamp: string;
  title: string;
  url: string;
}

interface SummaryResultProps {
  executiveSummary: string;
  keyTakeaways: string[];
  timestampedChapters: TimestampedChapter[];
  fullTranscript?: string;
}

export const SummaryResult: React.FC<SummaryResultProps> = ({
  executiveSummary,
  keyTakeaways,
  timestampedChapters,
  fullTranscript,
}) => {
  const { toast } = useToast();
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  const handleCopy = () => {
    const content = `
# Executive Summary
${executiveSummary}

# Key Takeaways
${keyTakeaways.map(point => `- ${point}`).join('\n')}

# Chapters
${timestampedChapters.map(chapter => `- [${chapter.timestamp}] ${chapter.title}`).join('\n')}
    `;
    
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "The summary has been copied in Markdown format",
    });
  };

  const handleDownload = () => {
    const content = `
# Executive Summary
${executiveSummary}

# Key Takeaways
${keyTakeaways.map(point => `- ${point}`).join('\n')}

# Chapters
${timestampedChapters.map(chapter => `- [${chapter.timestamp}] ${chapter.title}`).join('\n')}

${fullTranscript ? `# Full Transcript\n${fullTranscript}` : ''}
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
            <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">Executive Summary</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{executiveSummary}</p>
          </div>

          <Separator className="my-4" />
          
          <div>
            <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">Key Takeaways</h3>
            <ul className="space-y-3">
              {keyTakeaways.map((point, index) => (
                <li key={index} className="flex">
                  <span className="inline-flex items-center justify-center rounded-full bg-alea-blue/90 text-white w-6 h-6 text-xs mr-3 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-4" />
          
          <div>
            <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-gray-200">Chapters</h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
              <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {timestampedChapters.map((chapter, index) => (
                  <li key={index} className="py-2">
                    <a 
                      href={chapter.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex hover:bg-white dark:hover:bg-gray-800 p-2 rounded-md transition-colors w-full group"
                    >
                      <span className="font-mono text-alea-blue dark:text-blue-400 font-medium mr-3 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded text-sm">{chapter.timestamp}</span>
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-alea-blue dark:group-hover:text-blue-400 transition-colors">{chapter.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {fullTranscript && (
            <>
              <Separator className="my-4" />
              
              <Collapsible
                open={isTranscriptOpen}
                onOpenChange={setIsTranscriptOpen}
                className="w-full"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200">Full Transcript</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-alea-blue dark:text-blue-400">
                      {isTranscriptOpen ? "Hide Transcript" : "Show Transcript"}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-3 transition-all duration-300">
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md text-sm leading-relaxed max-h-96 overflow-y-auto">
                    {fullTranscript}
                  </div>
                </CollapsibleContent>
              </Collapsible>
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
