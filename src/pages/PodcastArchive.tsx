
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { generateMockHistory } from '../utils/mockData';
import { Button } from '@/components/ui/button';

interface PodcastItem {
  id: string;
  title: string;
  date: string;
  thumbnail?: string;
  previewText?: string;
}

const PodcastArchive = () => {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>(generateMockHistory());
  const [filter, setFilter] = useState('all');
  
  const filteredPodcasts = filter === 'all' 
    ? podcasts 
    : podcasts.filter(podcast => podcast.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 px-4 py-8 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with back button */}
          <div className="flex items-center mb-8">
            <Link to="/">
              <Button variant="ghost" className="gap-1">
                <ArrowLeft size={18} />
                <span>Back</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold ml-4">Podcast Archive</h1>
          </div>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              onClick={() => setFilter('all')}
              className="rounded-full"
            >
              All
            </Button>
            <Button 
              variant={filter === 'tech' ? 'default' : 'outline'} 
              onClick={() => setFilter('tech')}
              className="rounded-full"
            >
              Tech
            </Button>
            <Button 
              variant={filter === 'health' ? 'default' : 'outline'} 
              onClick={() => setFilter('health')}
              className="rounded-full"
            >
              Health
            </Button>
            <Button 
              variant={filter === 'business' ? 'default' : 'outline'} 
              onClick={() => setFilter('business')}
              className="rounded-full"
            >
              Business
            </Button>
          </div>
          
          {/* Grid of podcast cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {filteredPodcasts.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <Link to={`/?podcast=${podcast.id}`} className="block">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                    {podcast.thumbnail ? (
                      <img 
                        src={podcast.thumbnail} 
                        alt={podcast.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
                        No thumbnail
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-alea-blue transition-colors">{podcast.title}</h3>
                  <p className="text-sm text-foreground/70 mt-1">{podcast.date}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PodcastArchive;
