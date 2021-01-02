import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from 'src/constants';
import { Repeat as Icon } from 'src/icons';

import { useBottomSheet } from '../Context.ts';

interface Props {}

export const Repeat: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const opacity = range([80, 100], [0, 1]);

  const onPress = () => {
    console.log('repeat');
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
    right: 40,
  },
});
