import { ImageRequireSource } from 'react-native';

export interface ITrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: string;
  artwork?: ImageRequireSource;
  last?: boolean;
}
