export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Array<{
    name: string;
  }>;
  type: string;
  preview_url: string;
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
  type: string;
  release_date: string;
}

export type SearchResultType = 'track' | 'album'

export interface SearchResult {
  tracks: { items: Track[]; };
  albums: { items: Album[]; };
}

export interface AudioFeatures {
  acousticness: number
  danceability: number
  energy: number
  instrumentalness: number
  liveness: number
  speechiness: number
  valence: number 
}

export type AudioFeaturesResult = AudioFeatures & {
  duration_ms: number
  key: number
  mode: number
  time_signature: number
  tempo: number
  loudness: number
};

export type SpotifySearchParams = {
  q?: string;
  artist?: string;
  album?: string;
}

export type CardRenderProp = (result: Track | Album) => React.ReactNode;
