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
  const [swipeIndex, setSwipeIndex] = useState<number>(0);

  useEffect(() => {
    updateTrackPlayer(0);
  }, [tracks, lists]);

  const updateTrackPlayer = async (current: number) => {
    setActive(current);

    if (tracks.length && lists.length) {
      // simulate sql databases
      // find items in active playlist
      const activeTracks = lists[current].items.map((id: string) =>
        tracks.find((track: ITrack) => track.id === id),
      );

      await TrackPlayer.reset();

      // @ts-ignore
      await TrackPlayer.add(activeTracks).then(function () {});
    }
  };

  return (
    <Context.Provider
      value={{
        active,
        lists,
        tracks,
        swipeIndex,
        setActive,
        setLists,
        setTracks,
        setSwipeIndex,
        updateTrackPlayer,
      }}>
      {children}
    </Context.Provider>
  );
};
