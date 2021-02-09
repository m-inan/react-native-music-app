import { ITrack } from 'src/interfaces';

export type ContextType = {
  track: ITrack;
  isReady: boolean;
  isPlaying: boolean;

  setPlaying: (value: boolean) => void;
};
