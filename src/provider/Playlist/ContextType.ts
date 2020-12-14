import { IPlaylist, ITrack } from 'src/interfaces';

export type ContextType = {
  lists: IPlaylist[];
  items: ITrack[];

  setLists: (lists: IPlaylist[]) => void;
  setItems: (lists: ITrack[]) => void;
};
