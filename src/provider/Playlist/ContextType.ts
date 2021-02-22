import { IPlaylist, ITrack } from 'src/interfaces';

export type ContextType = {
  active: number;
  lists: IPlaylist[];
  tracks: ITrack[];

  setLists: (lists: IPlaylist[]) => void;
  setTracks: (lists: ITrack[]) => void;
  setActive: (active: number) => void;

  updateTrackPlayer: (current: number) => Promise<void>;
};
