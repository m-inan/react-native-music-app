import React from 'react';
import { View, StatusBar } from 'react-native';

import { Provider } from 'src/provider';
import { Playlist } from 'src/screens/Playlist';

interface Props {}

export const App: React.FC<Props> = () => {
  return (
    <Provider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Playlist title="Playlist title" />
    </Provider>
  );
};
