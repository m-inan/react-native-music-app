import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tracks, playlists } from '../../../data';

import { Colors } from 'src/constants';
import { usePlaylist } from 'src/provider';

import { Header } from './Header';
import { Title } from './Title';
import { Tabbar } from './Tabbar';
import { Tracks } from './Tracks';

import { useAnimation } from './Animation';

interface Props {}

export const Playlist: React.FC<Props> = () => {
  const { top } = useSafeAreaInsets();
  const { setLists, setTracks } = usePlaylist();

  const { translateX, panResponder, index } = useAnimation(playlists.length);

  useEffect(() => {
    setLists(playlists);
    setTracks(tracks);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Header />
      <Title swipeIndex={index} />
      <Tabbar swipeIndex={index} />
      <Tracks {...{ translateX, panResponder }} />
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
