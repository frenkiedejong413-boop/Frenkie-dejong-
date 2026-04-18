/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import PlaylistView from './components/PlaylistView';
import AuthView from './components/AuthView';
import { Song } from './types';
import { MOCK_SONGS } from './constants';
import { useAuth } from './lib/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [currentSong, setCurrentSong] = useState<Song | null>(MOCK_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  if (loading) return <AuthView />;
  if (!user) return <AuthView />;

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black select-none">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {currentView === 'home' && <HomeView onPlaySong={handlePlaySong} />}
            {currentView === 'search' && <SearchView />}
            {currentView === 'library' && <PlaylistView />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Music Player */}
      <Player 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
      />
    </div>
  );
}
