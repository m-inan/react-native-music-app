import React from 'react';
import { ScrollView } from 'react-native';

import { ITrack } from 'src/interfaces';
import { Item } from './Item';

const items: ITrack[] = [];

for (let i = 0; i < 40; i++) {
  items.push({
    id: i,
    title: `item ${i}`,
    artist: `artist ${i}`,
    source: 'test source',
    artwork: 'test artwork',
  });
}

interface Props {}

export const List: React.FC<Props> = () => {
  return (
    <ScrollView>
      {items.map((item: ITrack, key) => (
        <Item key={key} {...item} />
      ))}
    </ScrollView>
  );
};
