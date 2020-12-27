import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import { Colors } from 'src/constants';

import { useBottomSheet } from '../Context';

interface Props {}

export const Actions: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const height = range([50, 75]);
  const width = range(['45%', '100%']);
  const left = range(['55%', '0%']);
  const top = range([0, 75]);

  return (
    <Animated.View
      style={[styles.container, { height, width, top, left }]}></Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: Colors.black,
  },
});
