import React from 'react';
import { FlatList } from 'react-native';

import { ITrack } from 'src/interfaces';
import { Item } from './Item';

interface Props {
  items: ITrack[];
}

interface Props {}

export const List: React.FC<Props> = ({ items }: Props) => {
  return (
    <FlatList
      data={items}
      renderItem={Item}
      keyExtractor={(item: any) => item.id.toString()}
    />
  );
};
