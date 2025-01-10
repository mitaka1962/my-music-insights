import { Album, SpotifySearchParams, Track } from '@/lib/definitions'

export function convertTime(msec: number): string {
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

export function getKeyString(key: number, mode: number): string {
  const keyMap = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const keyStr = (key === -1) ? '' : keyMap[key];

  let modeStr = '';
  if (mode === 0) modeStr = 'Major';
  else if (mode === 1) modeStr = 'Minor';

  return `${keyStr}\u{00A0}${modeStr}`;
}

export function convertPercentage(f: number): number{
  return Math.round(f * 100);
}

// export function calculateSumFeature(features: AudioFeatures[], key: keyof AudioFeatures): number {
//   // feature might be null
//   return features.map((feature) => !feature ? 0 : feature[key]).reduce((acc, v) => acc + v, 0);
// }

// export function calculateAverageFeature(features: AudioFeatures[], key: keyof AudioFeatures): number {
//   return calculateSumFeature(features, key) / features.filter(Boolean).length;
// }

// export function getAverageFeaturesData(features: AudioFeatures[]): NormalizedAudioFeatures {
//   return {
//     acousticness: calculateAverageFeature(features, 'acousticness'),
//     danceability: calculateAverageFeature(features, 'danceability'),
//     energy: calculateAverageFeature(features, 'energy'),
//     instrumentalness: calculateAverageFeature(features, 'instrumentalness'),
//     liveness: calculateAverageFeature(features, 'liveness'),
//     speechiness: calculateAverageFeature(features, 'speechiness'),
//     valence: calculateAverageFeature(features, 'valence'),
//   };
// }

export function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isEmpty(obj: Object): boolean {
  return Object.keys(obj).length === 0;
}

export function translateThemeName(theme: string | undefined): string {
  if (theme === 'light') return 'ライト';
  if (theme === 'dark') return 'ダーク';
  return 'システム'
}

export function getSpotifyMinImageUrl(item: Track | Album): string {
  if ('album' in item)
    return item.album.images[item.album.images.length - 1].url;
  return item.images[item.images.length - 1].url;
}
