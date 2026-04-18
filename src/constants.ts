import { Song, Playlist, Category } from './types';

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    coverUrl: 'https://picsum.photos/seed/m83/300/300',
    duration: 243,
    color: '#3B82F6',
  },
  {
    id: '2',
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    coverUrl: 'https://picsum.photos/seed/weeknd/300/300',
    duration: 230,
    color: '#EF4444',
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    coverUrl: 'https://picsum.photos/seed/dualipa/300/300',
    duration: 203,
    color: '#F59E0B',
  },
  {
    id: '4',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    coverUrl: 'https://picsum.photos/seed/blinding/300/300',
    duration: 200,
    color: '#8B5CF6',
  },
  {
    id: '5',
    title: 'One More Time',
    artist: 'Daft Punk',
    album: 'Discovery',
    coverUrl: 'https://picsum.photos/seed/daft/300/300',
    duration: 320,
    color: '#EC4899',
  },
  {
    id: '6',
    title: 'Breezeblocks',
    artist: 'Alt-J',
    album: 'An Awesome Wave',
    coverUrl: 'https://picsum.photos/seed/altj/300/300',
    duration: 227,
    color: '#10B981',
  },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Top 50 - Global',
    description: 'Your daily update of the most played tracks right now.',
    coverUrl: 'https://picsum.photos/seed/global/400/400',
    songs: MOCK_SONGS,
    owner: 'Spotify',
  },
  {
    id: 'p2',
    name: 'Lo-fi Beats',
    description: 'Beats to relax/study to.',
    coverUrl: 'https://picsum.photos/seed/lofi/400/400',
    songs: MOCK_SONGS.slice(0, 3),
    owner: 'VibeStream',
  },
  {
    id: 'p3',
    name: 'Classic Rock',
    description: 'The legends that shaped rock history.',
    coverUrl: 'https://picsum.photos/seed/rock/400/400',
    songs: MOCK_SONGS.slice(2, 5),
    owner: 'VibeStream',
  },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Pop', color: '#1E3264', imageUrl: 'https://picsum.photos/seed/pop/200/200' },
  { id: 'c2', name: 'Rock', color: '#8C1932', imageUrl: 'https://picsum.photos/seed/rockcat/200/200' },
  { id: 'c3', name: 'Electronic', color: '#AF2896', imageUrl: 'https://picsum.photos/seed/elec/200/200' },
  { id: 'c4', name: 'Hip Hop', color: '#BC5900', imageUrl: 'https://picsum.photos/seed/hiphop/200/200' },
  { id: 'c5', name: 'Focus', color: '#503750', imageUrl: 'https://picsum.photos/seed/focus/200/200' },
  { id: 'c6', name: 'Gaming', color: '#777777', imageUrl: 'https://picsum.photos/seed/gaming/200/200' },
];
