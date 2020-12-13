import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from 'src/constants';

import { Header } from './Header';
import { Title } from './Title';
import { Tabbar } from './Tabbar';
import { Tracks } from './Tracks';

import { playlists, items } from './data';
import { useAnimation } from './animation';

interface Props {}

export const Playlist: React.FC<Props> = () => {
  const { top } = useSafeAreaInsets();

  const { translateX, panResponder, setPlaylistsIndex } = useAnimation(
    playlists.length,
  );

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Header />
      <Title />
      <Tabbar {...{ setPlaylistsIndex }} />
      <Tracks {...{ playlists, items, translateX, panResponder }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 40,
    color: 'white',
  },
  text: {
    fontSize: 22,
    color: 'white',
  },
});
