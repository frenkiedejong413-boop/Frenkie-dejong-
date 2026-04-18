import React from 'react';
import { Play } from 'lucide-react';
import { Song } from '../types';
import { motion } from 'motion/react';

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
}

export const SongCard: React.FC<SongCardProps> = ({ song, onPlay }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => onPlay(song)}
      className="bg-spotify-dark p-4 rounded-lg hover:bg-spotify-light group transition-all duration-300 cursor-pointer shadow-xl"
    >
      <div className="relative aspect-square mb-4 shadow-2xl rounded-sm overflow-hidden bg-spotify-light">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="object-cover w-full h-full shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <button
          className="absolute bottom-2 right-2 p-3 bg-spotify-green rounded-full shadow-2xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
        >
          <Play className="w-6 h-6 text-black fill-current" />
        </button>
      </div>
      <h3 className="font-bold truncate mb-1 text-[16px] leading-tight">{song.title}</h3>
      <p className="text-text-dim text-[14px] truncate">{song.artist}</p>
    </motion.div>
  );
}
