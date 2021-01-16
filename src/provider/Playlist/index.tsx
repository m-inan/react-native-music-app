import React, { useState, useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';

import { IPlaylist, ITrack } from 'src/interfaces';

import { Context } from './Context';

export { usePlaylist } from './Context';

interface Props {
  children: React.ReactNode;
}

export const PlaylistProvider: React.FC<Props> = ({ children }: Props) => {
  const [active, setActive] = useState<number>(0);
  const [lists, setLists] = useState<IPlaylist[]>([]);
  const [tracks, setTracks] = useState<ITrack[]>([]);

  useEffect(() => {
    if (tracks.length && lists.length) {
      // simulate sql databases
      // find items in active playlist
      const activeTracks = lists[active].items.map((id: number) =>
        tracks.find((track: ITrack) => track.id === String(id)),
      );

      // @ts-ignore
      TrackPlayer.add(activeTracks).then(function () {});
    }
  }, [tracks, lists, active]);

  return (
    <Context.Provider
      value={{ active, lists, tracks, setActive, setLists, setTracks }}>
      {children}
    </Context.Provider>
  );
};
