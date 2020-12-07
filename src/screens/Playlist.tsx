import React, { Fragment } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { useAppContext } from 'src/provider';

interface Props {
  title: string;
}

export const Playlist: React.FC<Props> = ({ title }) => {
  const { message: text, isReady, isPlaying } = useAppContext();

  const play = () => {
    TrackPlayer.play();
  };

  const pause = () => {
    TrackPlayer.pause();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.text}>{isPlaying ? 'Playing' : 'Pause'}</Text>

      {isReady && (
        <Fragment>
          <Button title="play" onPress={play} />
          <Button title="pause" onPress={pause} />
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
  },
  text: {
    fontSize: 22,
  },
});
