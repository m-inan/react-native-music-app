import { ImageRequireSource } from 'react-native';
import { ITrack } from 'src/interfaces';

export const defaultTrack: ITrack = {
  id: '1',
  title: 'undefined',
  artist: 'undefined',
  url: '',
  artwork: 0 as ImageRequireSource,
};
