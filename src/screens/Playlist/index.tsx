import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { tracks, playlists } from '../../../data';

import { Colors, Dimensions } from 'src/constants';
import { usePlaylist } from 'src/provider';

import { Header } from './Header';
import { Title } from './Title';
import { Tabbar } from './Tabbar';
import { Tracks } from './Tracks';

import { useAnimation } from './Animation';

interface Props {}

export const Playlist: React.FC<Props> = () => {
  const { setLists, setTracks } = usePlaylist();

  const { translateX, panResponder, index } = useAnimation(playlists.length);

  useEffect(() => {
    setLists(playlists);
    setTracks(
      tracks.map((item) => ({
        ...item,
        id: String(item.id),
        url: item.source,
      })),
    );
  }, []);

  return (
    <View style={styles.container}>
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
    paddingTop: Dimensions.topInset,
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
