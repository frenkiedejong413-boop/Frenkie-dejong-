import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { Song } from '../types';
import { MOCK_SONGS } from '../constants';
import { Music, Plus, Trash2, X, PlusCircle } from 'lucide-react';
import MainHeader from './MainHeader';

interface UserPlaylist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  ownerId: string;
}

export default function PlaylistView() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState<UserPlaylist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<UserPlaylist | null>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'playlists'), where('ownerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserPlaylist));
      setPlaylists(list);
      if (selectedPlaylist) {
        const updated = list.find(p => p.id === selectedPlaylist.id);
        if (updated) setSelectedPlaylist(updated);
      }
    }, (error) => {
      console.error('Error fetching playlists:', error);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCreatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newName.trim()) return;

    try {
      await addDoc(collection(db, 'playlists'), {
        name: newName,
        description: newDesc,
        ownerId: user.uid,
        songs: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setNewName('');
      setNewDesc('');
      setIsModalOpen(false);
    } catch (error) {
      handleFirestoreError(error, 'create', 'playlists');
    }
  };

  const handleDeletePlaylist = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this playlist?')) return;
    try {
      await deleteDoc(doc(db, 'playlists', id));
      if (selectedPlaylist?.id === id) setSelectedPlaylist(null);
    } catch (error) {
      handleFirestoreError(error, 'delete', `playlists/${id}`);
    }
  };

  const addSongToPlaylist = async (playlistId: string, song: Song) => {
    try {
      const playlistRef = doc(db, 'playlists', playlistId);
      await updateDoc(playlistRef, {
        songs: arrayUnion(song),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, 'update', `playlists/${playlistId}`);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-spotify-black content-gradient pb-20">
      <MainHeader />
      
      <main className="px-8 mt-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">
              {selectedPlaylist ? selectedPlaylist.name : 'Your Library'}
            </h1>
            <p className="text-text-dim text-sm">
              {selectedPlaylist ? selectedPlaylist.description : 'Create and manage your personalized playlists'}
            </p>
          </div>
          <div className="flex gap-2">
            {selectedPlaylist && (
              <button 
                onClick={() => setSelectedPlaylist(null)}
                className="bg-spotify-light text-white font-bold py-3 px-6 rounded-full hover:bg-zinc-700 transition-all text-sm"
              >
                Back to Library
              </button>
            )}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-white text-black font-bold py-3 px-6 rounded-full hover:scale-105 transition-transform text-sm"
            >
              <Plus className="w-5 h-5" />
              New Playlist
            </button>
          </div>
        </div>

        {!selectedPlaylist ? (
          playlists.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-spotify-dark/50 rounded-xl border border-white/5">
               <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                  <Music className="w-8 h-8 text-text-dim" />
               </div>
               <h2 className="text-xl font-bold mb-2">No playlists yet</h2>
               <p className="text-text-dim max-w-xs mb-8">Click the button above to start your first collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {playlists.map((playlist) => (
                <div 
                  key={playlist.id}
                  onClick={() => setSelectedPlaylist(playlist)}
                  className="bg-spotify-dark p-4 rounded-lg group hover:bg-spotify-light transition-all shadow-xl cursor-pointer"
                >
                  <div className="aspect-square bg-zinc-800 rounded-sm mb-4 flex items-center justify-center relative shadow-2xl">
                     <Music className="w-12 h-12 text-zinc-600" />
                     <button 
                      onClick={(e) => { e.stopPropagation(); handleDeletePlaylist(playlist.id); }}
                      className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
                  <h3 className="font-bold truncate text-[16px] mb-1">{playlist.name}</h3>
                  <p className="text-text-dim text-[12px] truncate">{playlist.songs?.length || 0} songs</p>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col gap-8">
            <section>
              <h2 className="text-xl font-bold mb-4">Songs in this playlist</h2>
              {selectedPlaylist.songs.length === 0 ? (
                <p className="text-text-dim italic">This playlist is currently empty. Add some songs below!</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {selectedPlaylist.songs.map((song, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-md transition-colors group">
                       <span className="text-text-dim w-4 text-center">{idx + 1}</span>
                       <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-sm" referrerPolicy="no-referrer" />
                       <div className="flex-1">
                          <div className="font-medium">{song.title}</div>
                          <div className="text-xs text-text-dim">{song.artist}</div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="bg-spotify-dark/30 p-6 rounded-xl border border-white/5">
              <h2 className="text-xl font-bold mb-4">Suggested Songs</h2>
              <div className="flex flex-col gap-2">
                {MOCK_SONGS.filter(s => !selectedPlaylist.songs.find(ps => ps.id === s.id)).map((song) => (
                  <div key={song.id} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-md transition-colors group">
                     <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-sm" referrerPolicy="no-referrer" />
                     <div className="flex-1">
                        <div className="font-medium">{song.title}</div>
                        <div className="text-xs text-text-dim">{song.artist}</div>
                     </div>
                     <button 
                      onClick={() => addSongToPlaylist(selectedPlaylist.id, song)}
                      className="flex items-center gap-2 border border-zinc-500 rounded-full px-4 py-1 text-sm font-bold hover:border-white transition-colors"
                     >
                       <PlusCircle className="w-4 h-4" />
                       Add
                     </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-spotify-dark w-full max-w-md rounded-xl p-8 shadow-2xl border border-white/10 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-text-dim hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">New Playlist</h2>
            <form onSubmit={handleCreatePlaylist} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-dim">Name</label>
                <input 
                  autoFocus
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-spotify-light rounded-md p-3 text-white outline-none focus:ring-2 focus:ring-spotify-green transition-all"
                  placeholder="My Playlist"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-dim">Description</label>
                <textarea 
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="bg-spotify-light rounded-md p-3 text-white outline-none focus:ring-2 focus:ring-spotify-green transition-all h-24 resize-none"
                  placeholder="Add an optional description"
                />
              </div>
              <button 
                type="submit"
                className="mt-4 bg-spotify-green text-black font-bold py-3 rounded-full hover:scale-105 transition-transform"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
