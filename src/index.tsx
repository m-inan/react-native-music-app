import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import TrackPlayer from 'react-native-track-player';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
});
