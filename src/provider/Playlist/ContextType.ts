import { IPlaylist, ITrack } from 'src/interfaces';

export type ContextType = {
  lists: IPlaylist[];
  tracks: ITrack[];

  setLists: (lists: IPlaylist[]) => void;
  setTracks: (lists: ITrack[]) => void;
};
