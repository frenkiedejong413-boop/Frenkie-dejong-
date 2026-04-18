export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  color: string; // for background gradients
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: Song[];
  owner: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  imageUrl: string;
}
