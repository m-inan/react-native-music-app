import React from 'react';
import { View, StatusBar } from 'react-native';

import { Provider } from 'src/provider';
import { Playlist } from 'src/screens/Playlist';

interface Props {}

export const App: React.FC<Props> = () => {
  return (
    <Provider value={{ message: 'this is context message' }}>
      <StatusBar translucent={true} hidden={true} />
      <View style={{ height: 5, backgroundColor: 'black' }} />
      <Playlist title="Playlist title" />
    </Provider>
  );
};
