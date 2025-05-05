
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Copy, Download, Send, Share } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

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
    <Card className="summary-card w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl">Podcast Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-lg mb-2">Executive Summary</h3>
          <p className="text-gray-700">{executiveSummary}</p>
        </div>

        <Separator />
        
        <div>
          <h3 className="font-medium text-lg mb-2">Key Takeaways</h3>
          <ul className="space-y-2">
            {keyTakeaways.map((point, index) => (
              <li key={index} className="flex">
                <span className="inline-flex items-center justify-center rounded-full bg-alea-blue text-white w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />
        
        <div>
          <h3 className="font-medium text-lg mb-2">Chapters</h3>
          <ul className="space-y-2">
            {timestampedChapters.map((chapter, index) => (
              <li key={index} className="flex">
                <a 
                  href={chapter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:bg-gray-50 p-1 rounded transition-colors w-full"
                >
                  <span className="font-mono text-alea-blue font-medium mr-2">{chapter.timestamp}</span>
                  <span>{chapter.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {fullTranscript && (
          <>
            <Separator />
            
            <Collapsible
              open={isTranscriptOpen}
              onOpenChange={setIsTranscriptOpen}
              className="w-full"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">Full Transcript</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isTranscriptOpen ? "Hide Transcript" : "Show Transcript"}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2">
                <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-md">
                  {fullTranscript}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy size={16} className="mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download size={16} className="mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={handleSendToGDocs}>
            <Send size={16} className="mr-2" />
            Send to Docs
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share size={16} className="mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SummaryResult;
