import React, { useState } from 'react';

import { IPlaylist, ITrack } from 'src/interfaces';

import { Context } from './Context';

export { usePlaylist } from './Context';

interface Props {
  children: React.ReactNode;
}

export const PlaylistProvider: React.FC<Props> = ({ children }: Props) => {
  const [lists, setLists] = useState<IPlaylist[]>([]);
  const [tracks, setTracks] = useState<ITrack[]>([]);

  return (
    <Context.Provider value={{ lists, tracks, setLists, setTracks }}>
      {children}
    </Context.Provider>
  );
};
