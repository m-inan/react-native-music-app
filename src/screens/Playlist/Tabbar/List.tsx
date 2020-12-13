import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';

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
  swipeIndex: Animated.Value;
}

export const List: React.FC<Props> = ({ swipeIndex }) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    swipeIndex.addListener(({ value }: { value: number }) => {
      setIndex(value);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({
          item,
          index: key,
        }: {
          item: IPlaylist;
          index: number;
        }) => (
          <TouchableOpacity
            onPress={() => {
              swipeIndex.setValue(key);
            }}>
            <Item {...item} isActive={index === key} />
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        keyExtractor={(item: IPlaylist) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  flatList: {
    paddingLeft: 25,
    paddingVertical: 20,
  },
});
