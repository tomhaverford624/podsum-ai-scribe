
import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import UrlInput from '../components/UrlInput';
import ProcessingFeedback from '../components/ProcessingFeedback';
import SummaryResult from '../components/SummaryResult';
import AdvancedOptions from '../components/AdvancedOptions';
import HistoryDrawer from '../components/HistoryDrawer';
import Footer from '../components/Footer';
import { generateMockPodcastInfo, generateMockSummary, generateMockHistory } from '../utils/mockData';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState('');
  const [podcastInfo, setPodcastInfo] = useState<any>(null);
  const [summaryResult, setSummaryResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  
  // Advanced options
  const [summaryLength, setSummaryLength] = useState('medium');
  const [language, setLanguage] = useState('en');
  const [modelQuality, setModelQuality] = useState('standard');
  
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load mock history
    setHistory(generateMockHistory());
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
        thumbnail: mockInfo.thumbnail
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 10));
      
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
      
      // Scroll to summary
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              AI-Powered Podcast Summarization
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform long podcasts into concise summaries with key insights and timestamped chapters.
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <UrlInput onSubmit={handleSubmit} isProcessing={isProcessing} />
            <div className="ml-2">
              <HistoryDrawer history={history} onSelect={handleSelectHistory} />
            </div>
          </div>
          
          <AdvancedOptions
            summaryLength={summaryLength}
            onSummaryLengthChange={setSummaryLength}
            language={language}
            onLanguageChange={setLanguage}
            modelQuality={modelQuality}
            onModelQualityChange={setModelQuality}
          />
          
          {isProcessing && podcastInfo && (
            <ProcessingFeedback
              podcastInfo={podcastInfo}
              progress={processingProgress}
              currentStep={processingStep}
              onCancel={handleCancelProcessing}
            />
          )}
          
          <div ref={summaryRef}>
            {!isProcessing && summaryResult && (
              <SummaryResult
                executiveSummary={summaryResult.executiveSummary}
                keyTakeaways={summaryResult.keyTakeaways}
                timestampedChapters={summaryResult.timestampedChapters}
                fullTranscript={summaryResult.fullTranscript}
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
