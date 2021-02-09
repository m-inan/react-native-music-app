import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import TrackPlayer, {
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
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.updateOptions({
        // Whether the player should stop running when the app is closed on Android
        stopWithApp: true,

        // An array of media controls capabilities
        // Can contain CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_STOP, CAPABILITY_SEEK_TO,
        // CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS, CAPABILITY_SET_RATING
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SEEK_TO,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],

        // An array of capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SEEK_TO,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
      }).then(() => {
        setReady(true);
      });
    });
  }, []);

  useEffect(() => {
    addEventListener('playback-track-changed', async () => {
      let trackId = await getCurrentTrack();
      let trackObject = await getTrack(trackId);

      if (trackObject) {
        setTrack({ ...trackObject, duration: '' });
      }
    });

    AppState.addEventListener('change', async (appState) => {
      console.log(appState);
      if (appState == 'active') {
        const state = await TrackPlayer.getState();

        console.log(state == TrackPlayer.STATE_PLAYING);

        setPlaying(state == TrackPlayer.STATE_PLAYING);
      }
    });
  }, []);

  return (
    <Context.Provider
      value={{
        track,
        isReady,
        isPlaying,
        setPlaying,
      }}>
      {children}
    </Context.Provider>
  );
};

export { usePlayer } from './Context';
