import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import { useBottomSheet } from '../../Context';

import { Artist } from './Artist';
import { Title } from './Title';
import { Genre } from './Genre';

interface Props {}

export const Informations: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const height = range([50, 75]);
  const width = range(['55%', '100%']);

  return (
    <Animated.View style={[styles.container, { height, width }]}>
      <Artist />
      <Title />
      <Genre />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    alignItems: 'flex-start',
  },
});
