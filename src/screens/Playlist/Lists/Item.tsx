import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {
  skip,
  play,
  addEventListener,
  getState,
  STATE_READY,
  STATE_PLAYING,
} from 'react-native-track-player';

import { ITrack } from 'src/interfaces';
import { Colors } from 'src/constants';
import { usePlaylist } from 'src/provider';
import { Text } from 'src/components';
import { Options } from 'src/icons';

interface Props {
  item?: ITrack;
  last: boolean;
  playlistIndex: number;
}

export const Item: React.FC<Props> = ({ item, last, playlistIndex }: Props) => {
  if (!item) return null;

  const { id, title, artwork, artist, duration } = item;
  const { active, updateTrackPlayer } = usePlaylist();

  const onPress = async () => {
    if (active !== playlistIndex) {
      await updateTrackPlayer(playlistIndex);
    }

    // get state before skip
    const state = await getState();

    await skip(id);

    // If it can't be played, wait until it's ready and then play
    if (state !== STATE_PLAYING) {
      let subscription = addEventListener('playback-state', (data) => {
        if (data.state === STATE_READY) {
          play();

          subscription.remove();
        }
      });
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.artworkContainer}>
        {artwork ? <FastImage source={artwork} style={styles.artwork} /> : null}

        <View style={styles.artworkInlineBorder}>
          <View style={styles.artworkPoint} />
        </View>
      </View>

      <View style={[styles.content, last && { borderBottomWidth: 0 }]}>
        <View style={styles.information}>
          <Text size={16}>{title}</Text>

          <View style={styles.artist}>
            <Text numberOfLines={1} ellipsizeMode="tail" size={15}>
              {artist}
            </Text>
          </View>
        </View>

        <View style={styles.time}>
          <Text color={Colors.mute} size={16}>
            {duration}
          </Text>
        </View>
        <View style={styles.options}>
          <Options size={22} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  artworkContainer: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },

  artwork: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },

  artworkInlineBorder: {
    width: 47,
    height: 47,
    borderRadius: 47 / 2,
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },

  artworkPoint: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.black,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.mute,
    marginLeft: 20,
    paddingVertical: 10,
  },

  information: {
    flex: 1,
    paddingRight: 10,
  },

  artist: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    minWidth: 50,
    alignItems: 'flex-end',
  },

  options: {
    minWidth: 50,
    alignItems: 'flex-end',
  },
});
