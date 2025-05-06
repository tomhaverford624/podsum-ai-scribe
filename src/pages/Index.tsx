import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import EnhancedUrlInput from '../components/EnhancedUrlInput';
import ProcessingFeedback from '../components/ProcessingFeedback';
import SummaryResult from '../components/SummaryResult';
import HistoryList from '../components/HistoryList';
import Footer from '../components/Footer';
import { generateMockPodcastInfo, generateMockSummary, generateMockHistory } from '../utils/mockData';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';

const Index = () => {
  const { toast } = useToast();
  
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState('');
  const [podcastInfo, setPodcastInfo] = useState<any>(null);
  const [summaryResult, setSummaryResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  
  // Demo URL
  const demoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  
  // Advanced options
  const [summaryLength, setSummaryLength] = useState('medium');
  const [language, setLanguage] = useState('en');
  const [modelQuality, setModelQuality] = useState('standard');
  
  const summaryRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Load mock history with preview texts
    const mockHistory = generateMockHistory();
    // Add preview text to history items
    const enhancedHistory = mockHistory.map(item => ({
      ...item,
      previewText: `Key insight from ${item.title.split(' ').slice(0, 3).join(' ')}...`
    }));
    setHistory(enhancedHistory);
  }, []);

  const handleSubmit = async (submittedUrl: string) => {
    try {
      setUrl(submittedUrl);
      setIsProcessing(true);
      setPodcastInfo(null);
      setSummaryResult(null);
      
      // Simulate fetching podcast info
      await simulateProgress(0, 20);
      const mockInfo = generateMockPodcastInfo(submittedUrl);
      setPodcastInfo(mockInfo);
      setProcessingStep('Fetching podcast information...');
      
      // Simulate transcription
      await simulateProgress(20, 60);
      setProcessingStep('Transcribing audio...');
      
      // Simulate summarization
      await simulateProgress(60, 100);
      setProcessingStep('Generating summary...');
      
      // Complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get mock summary result
      const summary = generateMockSummary();
      setSummaryResult(summary);
      
      // Extract YouTube ID if present
      const youtubeMatch = submittedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      const videoId = youtubeMatch ? youtubeMatch[1] : undefined;
      
      // Add to history
      const newHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        title: mockInfo.title,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        thumbnail: mockInfo.thumbnail,
        previewText: summary.keyTakeaways[0].substring(0, 40) + "...",
        videoId
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 10));
      
      // Update podcastInfo with videoId
      setPodcastInfo({
        ...mockInfo,
        videoId
      });
      
      // Success toast
      toast({
        title: "Summary ready",
        description: "Enjoy the highlights.",
      });
      
      // Scroll to summary
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error processing podcast:', error);
      toast({
        title: "Processing Failed",
        description: "There was an error processing your podcast. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDemoClick = () => {
    handleSubmit(demoUrl);
  };

  const simulateProgress = async (start: number, end: number) => {
    const duration = 1000 + Math.random() * 2000; // 1-3 seconds
    const startTime = Date.now();
    
    return new Promise<void>(resolve => {
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentProgress = start + progress * (end - start);
        
        setProcessingProgress(Math.round(currentProgress));
        
        if (progress < 1) {
          requestAnimationFrame(updateProgress);
        } else {
          resolve();
        }
      };
      
      requestAnimationFrame(updateProgress);
    });
  };

  const handleCancelProcessing = () => {
    setIsProcessing(false);
    setProcessingProgress(0);
    setProcessingStep('');
    setPodcastInfo(null);
    toast({
      title: "Processing Cancelled",
      description: "The podcast summarization has been cancelled.",
    });
  };

  const handleSelectHistory = (id: string) => {
    const historyItem = history.find(item => item.id === id);
    if (historyItem) {
      setPodcastInfo({
        title: historyItem.title,
        thumbnail: historyItem.thumbnail,
        duration: "Retrieved from history",
        videoId: historyItem.videoId
      });
      setSummaryResult(generateMockSummary());
      
      // Show toast
      toast({
        title: "Summary Loaded",
        description: "Loaded from history.",
      });
      
      // Scroll to summary
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 px-4 py-8 md:px-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="podcast-title mb-4">Podcast Summarizer</h1>
            <p className="podcast-subtitle max-w-xl mx-auto">
              Turn any episode into an executive brief in seconds.
            </p>
          </motion.div>
          
          {/* Input Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <EnhancedUrlInput 
              onSubmit={handleSubmit} 
              onDemoClick={handleDemoClick} 
              isProcessing={isProcessing} 
            />
          </motion.div>
          
          {/* Latest Summary Result */}
          <div ref={summaryRef} className="mb-16">
            {isProcessing && podcastInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ProcessingFeedback
                  podcastInfo={podcastInfo}
                  progress={processingProgress}
                  currentStep={processingStep}
                  onCancel={handleCancelProcessing}
                />
              </motion.div>
            )}
            
            {!isProcessing && summaryResult && (
              <SummaryResult
                keyTakeaways={summaryResult.keyTakeaways}
                topicSections={summaryResult.topicSections}
                podcastInfo={podcastInfo}
              />
            )}
          </div>
          
          {/* History Section */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HistoryList history={history} onSelect={handleSelectHistory} />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
