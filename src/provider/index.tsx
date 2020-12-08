import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer, {
  registerPlaybackService,
  setupPlayer,
  getState,
  Track,
  STATE_PLAYING,
} from 'react-native-track-player';

import { AppContext } from './AppContext';

export { useAppContext } from './AppContext';

interface Props {}

export const Provider: React.FC<Props> = ({ children }) => {
  const [message, setMessage] = useState<string>('this is usestate message');
  const [isReady, setReady] = useState<boolean>(false);
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    registerPlaybackService(() => playbackService);
  }, []);

  useEffect(() => {
    setupPlayer().then(() => {
      // The player is ready to be used
      console.log('track player is ready');

      const track: Track = {
        id: '1',
        url:
          'https://github.com/m-inan/react-native-music-app/raw/master/data/sounds/lights.mp3',
        title: 'ligts',
        artist: 'minan',
        artwork:
          'https://github.com/m-inan/react-native-music-app/raw/master/data/artworks/lights.jpg',
      };

      TrackPlayer.add([track]).then(function () {
        // The tracks were added

        setReady(true);
      });
    });
  }, []);

  const playbackService = async () => {
    setMessage('set message in service');

    TrackPlayer.addEventListener('playback-state', async () => {
      const state = await getState();

      console.log('state', state, STATE_PLAYING);

      setPlaying(state === STATE_PLAYING);
    });
  };

  return (
    <SafeAreaProvider>
      <AppContext.Provider value={{ message, isReady, isPlaying }}>
        {children}
      </AppContext.Provider>
    </SafeAreaProvider>
  );
};
