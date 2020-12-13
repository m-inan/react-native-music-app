import React from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ITrack } from 'src/interfaces';
import { Item } from './Item';

interface Props {
  items: ITrack[];
}

interface Props {}

export const List: React.FC<Props> = ({ items }: Props) => {
  const { bottom } = useSafeAreaInsets();

  items[items.length - 1].last = true;

  return (
    <FlatList
      data={items}
      renderItem={Item}
      contentContainerStyle={{ paddingBottom: bottom }}
      keyExtractor={(item: ITrack) => item.id.toString()}
    />
  );
};
