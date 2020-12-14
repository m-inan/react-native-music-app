import React, { useState } from 'react';

import { IPlaylist, ITrack } from 'src/interfaces';

import { Context } from './Context';

export { usePlaylistContext } from './Context';

interface Props {
  children: React.ReactNode;
}

export const PlaylistProvider: React.FC<Props> = ({ children }: Props) => {
  const [lists, setLists] = useState<IPlaylist[]>([]);
  const [items, setItems] = useState<ITrack[]>([]);

  return (
    <Context.Provider value={{ lists, items, setLists, setItems }}>
      {children}
    </Context.Provider>
  );
};
