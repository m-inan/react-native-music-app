import { ITrack } from 'src/interfaces';

export type ContextType = {
  track: ITrack;
  isReady: boolean;
  isPlaying: boolean;
};
