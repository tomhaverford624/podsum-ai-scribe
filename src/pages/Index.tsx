import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import EnhancedUrlInput from '../components/EnhancedUrlInput';
import ProcessingFeedback from '../components/ProcessingFeedback';
import SummaryResult from '../components/SummaryResult';
import HistoryList from '../components/HistoryList';
import Footer from '../components/Footer';
import AnimatedWaveform from '../components/AnimatedWaveform';
import TimeSavedCounter from '../components/TimeSavedCounter';
import { generateMockPodcastInfo, generateMockSummary, generateMockHistory } from '../utils/mockData';
import { useToast } from "@/hooks/use-toast";
import { motion, useScroll, useTransform } from 'framer-motion';

const Index = () => {
  const { toast } = useToast();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState('');
  const [podcastInfo, setPodcastInfo] = useState<any>(null);
  const [summaryResult, setSummaryResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  
  // Demo URL for the "Try a demo link" button
  const demoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  
  // Advanced options - keeping these in state even though the UI is removed
  const [summaryLength, setSummaryLength] = useState('medium');
  const [language, setLanguage] = useState('en');
  const [modelQuality, setModelQuality] = useState('standard');
  
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        previewText: summary.keyTakeaways[0].substring(0, 40) + "..."
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 10));
      
      // Success toast
      toast({
        title: "Boom! Summary ready.",
        description: "We've analyzed the podcast and created your summary.",
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
        duration: "Retrieved from history"
      });
      setSummaryResult(generateMockSummary());
      
      // Show toast
      toast({
        title: "Summary Loaded",
        description: "Loaded summary from your history.",
      });
      
      // Scroll to summary
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <Header />
      
      <main className="flex-1 px-4 py-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 relative"
            style={{ opacity: heroOpacity }}
          >
            <motion.div className="relative z-10">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-alea-blue to-blue-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                AI‑Powered Podcast Summarization
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Transform long podcasts into concise summaries with key insights and topic analysis.
              </motion.p>
              
              <TimeSavedCounter summaryCount={history.length} />
            </motion.div>
            
            {/* Animated waveform background */}
            <AnimatedWaveform />
          </motion.div>
          
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EnhancedUrlInput 
              onSubmit={handleSubmit} 
              onDemoClick={handleDemoClick} 
              isProcessing={isProcessing} 
            />
          </motion.div>
          
          {/* History section */}
          <motion.div 
            className="w-full max-w-5xl mx-auto mt-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <HistoryList history={history} onSelect={handleSelectHistory} />
          </motion.div>
          
          {isProcessing && podcastInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProcessingFeedback
                podcastInfo={podcastInfo}
                progress={processingProgress}
                currentStep={processingStep}
                onCancel={handleCancelProcessing}
              />
            </motion.div>
          )}
          
          <div ref={summaryRef}>
            {!isProcessing && summaryResult && (
              <SummaryResult
                keyTakeaways={summaryResult.keyTakeaways}
                topicSections={summaryResult.topicSections}
                podcastInfo={podcastInfo}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
