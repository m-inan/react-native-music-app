import { ImageRequireSource } from 'react-native';

export interface ITrack {
  id: number;
  title: string;
  artist: string;
  source: string;
  artwork: ImageRequireSource;
  last?: boolean;
}
