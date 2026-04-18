import React from 'react';
import { MOCK_SONGS, MOCK_PLAYLISTS } from '../constants';
import { Song } from '../types';
import { SongCard } from './SongCard';
import MainHeader from './MainHeader';

interface HomeViewProps {
  onPlaySong: (song: Song) => void;
}

export default function HomeView({ onPlaySong }: HomeViewProps) {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide content-gradient pb-20">
      <MainHeader />
      
      <main className="px-8 mt-4">
        {/* Hero Section */}
        <div className="hero-gradient h-[200px] rounded-lg p-8 flex flex-col justify-end shadow-2xl mb-10 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <div className="w-64 h-64 bg-white rounded-full blur-3xl" />
           </div>
           <div className="text-[12px] uppercase font-bold tracking-tight mb-2">Playlist</div>
           <h1 className="text-5xl font-black leading-none mb-4">Your Daily Mix 1</h1>
           <div className="text-sm font-medium opacity-90">Featuring Arctic Monkeys, Tame Impala, and The Strokes</div>
        </div>

        <h2 className="text-2xl font-bold mb-6 tracking-tight">{greeting()}</h2>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {MOCK_PLAYLISTS.map((playlist) => (
            <div 
              key={playlist.id} 
              className="group flex items-center bg-spotify-dark hover:bg-spotify-light transition-all rounded-md overflow-hidden cursor-pointer shadow-lg"
            >
              <img src={playlist.coverUrl} alt={playlist.name} className="w-20 h-20 shadow-xl" referrerPolicy="no-referrer" />
              <div className="px-4 flex-1 font-bold truncate text-[16px]">{playlist.name}</div>
              <div className="p-3 mr-4 bg-spotify-green rounded-full shadow-2xl opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center translate-x-[1px]">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section: Made for You */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Made for you</h2>
            <span className="text-sm font-bold text-text-dim hover:underline cursor-pointer">Show all</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {MOCK_SONGS.map((song) => (
              <SongCard key={song.id} song={song} onPlay={onPlaySong} />
            ))}
          </div>
        </section>

        {/* Section: Recently Played */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold hover:underline cursor-pointer">Recently Played</h2>
            <span className="text-sm font-bold text-zinc-400 hover:underline cursor-pointer">Show all</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...MOCK_SONGS].reverse().map((song) => (
              <SongCard key={song.id + '-recent'} song={song} onPlay={onPlaySong} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
