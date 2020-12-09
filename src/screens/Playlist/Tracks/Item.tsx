import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ITrack } from 'src/interfaces';
import { Colors } from 'src/constants';
import { Text } from 'src/components';
import { Options } from 'src/icons';

interface Props extends ITrack {}

export const Item: React.FC<Props> = ({ id, title }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.artwork}>
        <View style={styles.artworkInlineBorder}>
          <View style={styles.artworkPoint} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.information}>
          <Text size={16}>
            {String(id)} - {title}
          </Text>
          <View style={styles.artistAndGenre}>
            <Text size={15}>Artist</Text>

            <Text style={styles.genre} color="rgb(121, 127, 129)" size={14}>
              Genre
            </Text>
          </View>
        </View>

        <View style={styles.time}>
          <Text color={Colors.mute} size={16}>
            4:20
          </Text>
        </View>
        <View style={styles.options}>
          <Options size={22} />
        </View>
      </View>
    </View>
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

  artwork: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },

  artworkInlineBorder: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.mute,
    marginLeft: 20,
    paddingVertical: 10,
  },

  information: {
    flex: 1,
  },

  artistAndGenre: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  genre: {
    marginLeft: 10,
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
