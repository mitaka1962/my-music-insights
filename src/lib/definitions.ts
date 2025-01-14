export type SpotifySearchResultType = 'track' | 'album'

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Array<{
    name: string;
  }>;
  type: string;
  duration_ms: number;
  external_urls: { spotify: string; };
}

export interface Album {
  id: string;
  name: string;
  album_type: 'album' | 'single' | 'compilation';
  images: Array<{
    url: string;
  }>;
  artists: Array<{
    name: string;
  }>;
  tracks: { items: Omit<Track, 'album'>[]; };
  type: string;
  release_date: string;
  external_urls: { spotify: string; };
}

export interface SpotifyPagingObject<T> {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: T[];
}

export interface SpotifyTrackSearchResult {
  tracks: SpotifyPagingObject<Track>;
}

export interface SpotifyAlbumSearchResult {
  albums: SpotifyPagingObject<Album>;
}

export type SpotifySearchResult =
  SpotifyTrackSearchResult | SpotifyAlbumSearchResult;

export interface NormalizedAudioFeatures {
  acousticness: number
  danceability: number
  energy: number
  instrumentalness: number
  liveness: number
  speechiness: number
  valence: number 
}

export type AudioFeatures = NormalizedAudioFeatures & {
  duration_ms: number
  key: number
  mode: number
  time_signature: number
  tempo: number
  loudness: number
}

export interface SeveralAudioFeatures {
  audio_features: AudioFeatures[];
}

export type SpotifySearchParams = {
  q?: string;
  artist?: string;
  album?: string;
}

export type CardRenderProp = (result: Track | Album) => React.ReactNode;

export interface MylistCardData {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    imageColor: string;
  };
  tracks: {
    position: number;
    mylistId: string;
    trackId: string;
  }[];
  imageUrls?: string[]; 
}
