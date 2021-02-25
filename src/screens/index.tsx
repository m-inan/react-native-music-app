import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from 'src/constants';

import { Playlist } from './Playlist';
import { Player } from './Player';

export const Screens = () => {
  return (
    <View style={styles.container}>
      <Playlist />
      <Player />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
