import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function MainHeader() {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between py-4 bg-transparent backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center p-1 bg-black rounded-full text-zinc-400 cursor-not-allowed">
          <ChevronLeft className="w-8 h-8 opacity-40" />
        </button>
        <button className="flex items-center justify-center p-1 bg-black rounded-full text-zinc-400 cursor-not-allowed">
          <ChevronRight className="w-8 h-8 opacity-40" />
        </button>
      </div>

      <div className="relative">
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="px-3 py-1 bg-spotify-black rounded-full flex items-center gap-2 text-[13px] font-bold border border-transparent hover:bg-spotify-light transition-all"
        >
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || 'User'} className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
          )}
          <span className="truncate max-w-[120px]">{user?.displayName || 'User'}</span>
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-spotify-light rounded-md shadow-2xl py-1 z-[100] border border-white/5">
            <button 
              onClick={() => logout()}
              className="w-full flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors"
            >
              Sign out
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
