import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { IPlaylist } from 'src/interfaces';

import { Item } from './Item';

const items: IPlaylist[] = [];

for (let i = 0; i < 3; i++) {
  items.push({
    id: i,
    title: `item ${i}`,
    items: [],
  });
}
interface Props {
  setPlaylistsIndex: (value: number) => void;
}

export const List: React.FC<Props> = ({ setPlaylistsIndex }) => {
  return (
    <View style={styles.container}>
      {items.map((item: IPlaylist, key: number) => (
        <TouchableOpacity
          key={key}
          onPress={() => {
            setPlaylistsIndex(key);
          }}>
          <Item {...item} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    flexDirection: 'row',
  },
});
