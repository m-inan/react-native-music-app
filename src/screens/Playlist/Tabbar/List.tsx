import React from 'react';
import { View, StyleSheet } from 'react-native';

import { IPlaylist } from 'src/interfaces';

import { Item } from './Item';

const items: IPlaylist[] = [];

for (let i = 0; i < 20; i++) {
  items.push({
    id: i,
    title: `item ${i}`,
    items: [],
  });
}
interface Props {}

export const List: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      {items.map((item: IPlaylist, key: number) => (
        <Item key={key} {...item} />
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
