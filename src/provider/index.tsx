import React, { createContext, useContext, useState, useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';

export const AppContext = createContext({});

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};

export const Provider = ({ children }) => {
  const [message, setMessage] = useState<string>('this is usestate message');
  const [isServiceRegistered, setServiceRegistered] = useState<boolean>(false);
  const [isReady, setReady] = useState<boolean>(false);

  useEffect(() => {
    console.log('register playbackservice');
    TrackPlayer.registerPlaybackService(() => playbackService);
  }, []);

  useEffect(() => {
    console.log('isServiceRegistered', isServiceRegistered);
    TrackPlayer.setupPlayer().then(() => {
      // The player is ready to be used
      console.log('track player is ready');

      const track = {
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
    console.log('register playback');
    setMessage('set message in service');
    setServiceRegistered(true);
  };

  return (
    <AppContext.Provider value={{ message, setMessage, isReady }}>
      {children}
    </AppContext.Provider>
  );
};
