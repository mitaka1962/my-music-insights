import { Album, AudioFeatures, MylistCardData, NormalizedAudioFeatures, SpotifySearchParams, Track } from '@/lib/definitions'

export const convertTime = (msec: number): string => {
  const totalSec = Math.floor(msec / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min >= 60) {
    const hour = Math.floor(min / 60);
    const min2 = min % 60
    return `${hour}:${min2.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

export const getKeyString = (key: number, mode: number): string => {
  const keyMap = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const keyStr = (key === -1) ? '' : keyMap[key];

  let modeStr = '';
  if (mode === 0) modeStr = 'Major';
  else if (mode === 1) modeStr = 'Minor';

  return `${keyStr}\u{00A0}${modeStr}`;
};

export const convertPercentage = (f: number): number => Math.round(f * 100);

export const calculateSumFeature = (features: AudioFeatures[], key: keyof AudioFeatures): number => {
  // feature might be null
  return features.map((feature) => !feature ? 0 : feature[key]).reduce((acc, v) => acc + v, 0);
};

export const calculateAverageFeature = (features: AudioFeatures[], key: keyof AudioFeatures): number => {
  return calculateSumFeature(features, key) / features.filter(Boolean).length;
};

export const getAverageFeaturesData = (features: AudioFeatures[]): NormalizedAudioFeatures => {
  return {
    acousticness: calculateAverageFeature(features, 'acousticness'),
    danceability: calculateAverageFeature(features, 'danceability'),
    energy: calculateAverageFeature(features, 'energy'),
    instrumentalness: calculateAverageFeature(features, 'instrumentalness'),
    liveness: calculateAverageFeature(features, 'liveness'),
    speechiness: calculateAverageFeature(features, 'speechiness'),
    valence: calculateAverageFeature(features, 'valence'),
  };
};

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEmpty = (obj: SpotifySearchParams): boolean => {
  return !obj.q && !obj.artist && !obj.album;
}

export const translateThemeName = (theme: string | undefined): string => {
  if (theme === 'light') return 'ライト';
  if (theme === 'dark') return 'ダーク';
  return 'システム'
};

export const getSpotifyMinImageUrl = (item: Track | Album): string => {
  if ('album' in item)
    return item.album.images[item.album.images.length - 1].url;
  return item.images[item.images.length - 1].url;
};

export const getTrackIdList = (mylists: MylistCardData[]): string[] => {
  return mylists.flatMap(
    (mylist: { tracks: any[]; }) => mylist.tracks.map(item => item.trackId)
  );
};
