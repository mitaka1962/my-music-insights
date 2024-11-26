import { Album, AudioFeaturesResult, SpotifySearchParams, Track } from '@/lib/definitions'

export const convertTime = (msec: number) => {
  const totalSec = Math.floor(msec / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min >= 60) {
    const hour = Math.floor(min / 60);
    const min2 = min % 60
    return `${hour}:${min2.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export const getKeyString = (key: number, mode: number) => {
  const keyMap = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const keyStr = (key === -1) ? '' : keyMap[key];
  const modeStr = (mode === 1) ? 'Major' : 'Minor';
  return `${keyStr}\u{00A0}${modeStr}`;
}

export const convertPercentage = (f: number) => Math.round(f * 100);

export const calculateSumFeature = (features: AudioFeaturesResult[], key: keyof AudioFeaturesResult) => {
  // feature might be null
  return features.map((feature) => !feature ? 0 : feature[key]).reduce((acc, v) => acc + v, 0);
};

export const calculateAverageFeature = (features: AudioFeaturesResult[], key: keyof AudioFeaturesResult) => {
  return calculateSumFeature(features, key) / features.filter(Boolean).length;
};

export const getAverageFeaturesData = (features: AudioFeaturesResult[]) => {
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

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEmpty = (obj: SpotifySearchParams) => {
  return !obj.q && !obj.artist && !obj.album;
}

export const translateThemeName = (theme: string | undefined) => {
  if (theme === 'light') return 'ライト';
  if (theme === 'dark') return 'ダーク';
  return 'システム'
};

export const getSpotifyMinImageUrl = (item: Track | Album) => {
  if ('album' in item)
    return item.album.images[item.album.images.length - 1].url;
  return item.images[item.images.length - 1].url;
};
