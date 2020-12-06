import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.setupPlayer().then(() => {
  // The player is ready to be used
  console.log('track player is ready');
});

interface Props {}

export const App: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starting rewrite musicapp</Text>
    </View>
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
