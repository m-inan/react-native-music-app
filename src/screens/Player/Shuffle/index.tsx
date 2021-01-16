import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from 'src/constants';
import { Shuffle as Icon } from 'src/icons';

import { useBottomSheet } from '../Context';

interface Props {}

export const Shuffle: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const opacity = range([80, 100], [0, 1]);

  const onPress = () => {
    console.log('shuffle');
  };

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <TouchableOpacity onPress={onPress}>
        <Icon fill={Colors.primary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 40,
  },
});
