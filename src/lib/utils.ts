import { AudioFeaturesResult, SpotifySearchParams } from '@/lib/definitions'

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
  return features.map((feature) => feature[key]).reduce((acc, v) => acc + v, 0);
};

export const calculateAverageFeature = (features: AudioFeaturesResult[], key: keyof AudioFeaturesResult) => {
  return calculateSumFeature(features, key) / features.length;
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEmpty = (obj: SpotifySearchParams) => {
  return Object.keys(obj).length === 0;
}
