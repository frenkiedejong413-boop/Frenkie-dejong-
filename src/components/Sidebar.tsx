import React, { useState, useEffect } from 'react';
import { Home, Search, Library, PlusSquare, Heart, Music2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const { user } = useAuth();
  const [userPlaylists, setUserPlaylists] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'playlists'), where('ownerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUserPlaylists(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
    });
    return () => unsubscribe();
  }, [user]);

  const menuItems = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'search', name: 'Search', icon: Search },
    { id: 'library', name: 'Your Library', icon: Library },
  ];

  const secondaryItems = [
    { id: 'create', name: 'Create Playlist', icon: PlusSquare },
    { id: 'liked', name: 'Liked Songs', icon: Heart },
  ];

  return (
    <div className="w-[240px] bg-spotify-black h-full flex flex-col px-3 py-6 gap-6">
      <div className="flex items-center gap-2 mb-2 px-3">
        <Music2 className="text-spotify-green w-8 h-8" />
        <span className="text-2xl font-black tracking-tight">VibeStream</span>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex items-center gap-4 px-3 py-2 text-sm font-bold transition-colors duration-200 rounded-md ${
              currentView === item.id ? 'text-white bg-spotify-light' : 'text-text-dim hover:text-white'
            }`}
          >
            <item.icon className={`w-6 h-6 ${currentView === item.id ? 'text-spotify-green' : 'text-text-dim'}`} />
            {item.name}
          </button>
        ))}
      </nav>

      <div className="flex flex-col gap-1">
        {secondaryItems.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-4 px-3 py-2 text-sm font-bold text-text-dim hover:text-white transition-colors duration-200"
          >
            <div className={`p-1 rounded-sm ${item.id === 'liked' ? 'bg-gradient-to-br from-indigo-700 to-blue-300' : 'bg-zinc-400'}`}>
              <item.icon className={`w-4 h-4 ${item.id === 'liked' ? 'text-white' : 'text-black'}`} />
            </div>
            {item.name}
          </button>
        ))}
      </div>

      <div className="h-[1px] bg-spotify-light mx-3" />

      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col pt-3">
        <div className="text-[12px] uppercase tracking-widest text-text-dim px-3 mb-3 font-bold">Playlists</div>
        {userPlaylists.map((playlist) => (
          <button
            key={playlist.id}
            onClick={() => setCurrentView('library')}
            className="px-3 py-2 text-[14px] text-text-dim hover:text-white text-left transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {playlist.name}
          </button>
        ))}
      </div>
    </div>
  );
}
