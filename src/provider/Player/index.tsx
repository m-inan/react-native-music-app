import React, { useState, useEffect } from 'react';
import {
  setupPlayer,
  registerPlaybackService,
  addEventListener,
  getCurrentTrack,
  getTrack,
} from 'react-native-track-player';

import { ITrack } from 'src/interfaces';

import { Context } from './Context';
import { defaultTrack } from './InitialValue';

interface Props {
  children: React.ReactNode;
}

export const PlayerProvider: React.FC<Props> = ({ children }: Props) => {
  const [isReady, setReady] = useState<boolean>(false);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [track, setTrack] = useState<ITrack>(defaultTrack);

  useEffect(() => {
    setupPlayer().then(() => {
      setReady(true);
      setPlaying(true);
    });
  }, []);

  useEffect(() => {
    registerPlaybackService(() => async () => {
      /**
       * Track is changed
       *
       **/
      addEventListener('playback-track-changed', async () => {
        let trackId = await getCurrentTrack();
        let trackObject = await getTrack(trackId);

        if (trackObject) {
          setTrack({ ...trackObject, duration: '' });
        }
      });
    });
  }, []);

  return (
    <Context.Provider
      value={{
        track,
        isReady,
        isPlaying,
      }}>
      {children}
    </Context.Provider>
  );
};

export { usePlayer } from './Context';
