import React from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ITrack } from 'src/interfaces';
import { Item } from './Item';

interface Props {
  items: ITrack[];
  playlist: number;
}

interface Props {}

export const List: React.FC<Props> = ({ items, playlist }: Props) => {
  const { bottom } = useSafeAreaInsets();

  items[items.length - 1].last = true;

  return (
    <FlatList
      data={items}
      renderItem={(data) => <Item {...data} {...{ playlist }} />}
      contentContainerStyle={{ paddingBottom: bottom }}
      keyExtractor={(item: ITrack) => item.id.toString()}
    />
  );
};
