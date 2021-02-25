import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { ITrack } from 'src/interfaces';
import { Colors } from 'src/constants';
import { Text } from 'src/components';
import { Play } from 'src/icons';

import { WIDTH, BOTTOM_INSET } from '../Dimensions';

interface Props extends ITrack {
  onPress: () => void;
}

export const Item: React.FC<Props> = ({
  title,
  artist,
  artwork,
  duration,

  onPress,
}: Props) => {
  return (
    <View style={styles.container}>
      {artwork && (
        <View style={styles.record}>
          <FastImage source={artwork} style={styles.artwork} />
          <View style={styles.cover}>
            <View style={styles.circle} />
          </View>

          <View style={styles.point} />
        </View>
      )}

      <View style={styles.information}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.detail}>
          <Text numberOfLines={1} style={styles.artist}>
            {artist}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={onPress}>
          <Play />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: BOTTOM_INSET,
  },

  record: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Colors.black,
    borderRadius: 30,
    marginRight: 10,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  cover: {
    width: '100%',
    height: '100%',
    padding: 7,
    position: 'absolute',
  },
  circle: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 999,
    borderColor: Colors.primary,
  },
  point: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.black,
  },

  information: {
    flex: 1,
  },

  title: {
    color: Colors.blue,
    paddingRight: 20,
  },

  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    width: WIDTH - 200,
  },

  artist: {
    fontSize: 13,
    color: Colors.mute,
  },

  dot: {
    marginHorizontal: 10,
    width: 2,
    height: 2,
    backgroundColor: 'white',
    color: Colors.mute,
  },
  duration: {
    color: Colors.mute,
    fontSize: 13,
  },

  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
