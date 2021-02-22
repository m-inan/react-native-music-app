import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PlaylistProvider } from './Playlist';
import { PlayerProvider } from './Player';

interface Props {
  children: React.ReactNode;
}

export const Provider: React.FC<Props> = ({ children }: Props) => {
  return (
    <SafeAreaProvider>
      <PlaylistProvider>
        <PlayerProvider>{children}</PlayerProvider>
      </PlaylistProvider>
    </SafeAreaProvider>
  );
};

export { usePlayer } from './Player';
export { usePlaylist } from './Playlist';
