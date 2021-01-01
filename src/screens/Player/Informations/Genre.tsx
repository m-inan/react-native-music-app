import React from 'react';
import { Animated } from 'react-native';

import { Colors } from 'src/constants';
import { Text } from 'src/components';

import { useBottomSheet } from '../Context';

interface Props {}

export const Genre: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const opacity = range([0, 0, 0, 1]);

  return (
    <Animated.View style={{ opacity, width: '100%', alignItems: 'center' }}>
      <Text color={Colors.light} size={14}>
        Reputation
      </Text>
    </Animated.View>
  );
};
