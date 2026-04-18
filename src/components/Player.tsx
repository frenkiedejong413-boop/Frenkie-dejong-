import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Maximize2, ListMusic } from 'lucide-react';
import { Song } from '../types';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function Player({ currentSong, isPlaying, setIsPlaying }: PlayerProps) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (currentSong) {
      setProgress((currentTime / currentSong.duration) * 100);
    }
  }, [currentTime, currentSong]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentSong) return null;

  return (
    <div className="h-[90px] bg-spotify-dark border-t border-spotify-light px-4 flex items-center justify-between">
      {/* Track Info */}
      <div className="flex items-center gap-4 w-[30%]">
        <img
          src={currentSong.coverUrl}
          alt={currentSong.title}
          className="w-14 h-14 rounded-sm shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <span className="text-[14px] font-medium hover:underline cursor-pointer truncate">{currentSong.title}</span>
          <span className="text-[12px] text-text-dim hover:underline cursor-pointer truncate">{currentSong.artist}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 max-w-[40%] w-full">
        <div className="flex items-center gap-6">
          <Shuffle className="w-5 h-5 text-text-dim hover:text-white cursor-pointer" />
          <SkipBack className="w-5 h-5 text-text-dim hover:text-white cursor-pointer fill-current" />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white rounded-full p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-black fill-current" />
            ) : (
              <Play className="w-5 h-5 text-black fill-current translate-x-0.5" />
            )}
          </button>
          <SkipForward className="w-5 h-5 text-text-dim hover:text-white cursor-pointer fill-current" />
          <Repeat className="w-5 h-5 text-text-dim hover:text-white cursor-pointer" />
        </div>
        
        <div className="flex items-center gap-2 w-full max-w-[600px] text-[11px] text-text-dim">
          <span>{formatTime(currentTime)}</span>
          <div className="flex-1 relative group h-1 bg-[#535353] rounded-full cursor-pointer overflow-hidden">
            <div 
              className="h-full bg-spotify-green rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center justify-end gap-3 w-[30%]">
        <ListMusic className="w-5 h-5 text-text-dim hover:text-white cursor-pointer" />
        <Volume2 className="w-5 h-5 text-text-dim hover:text-white cursor-pointer" />
        <div className="w-[100px] h-1 bg-[#535353] rounded-full relative group cursor-pointer overflow-hidden">
           <div className="h-full bg-white group-hover:bg-spotify-green rounded-full w-2/3 transition-colors" />
        </div>
        <Maximize2 className="w-5 h-5 text-text-dim hover:text-white cursor-pointer" />
      </div>
    </div>
  );
}
