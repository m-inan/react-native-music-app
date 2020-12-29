import React, { useState } from 'react';
import { Animated } from 'react-native';

import { Colors, Dimensions } from 'src/constants';
import { Text } from 'src/components';

import { useBottomSheet } from '../../Context';

const { width } = Dimensions;

interface Props {}

export const Artist: React.FC<Props> = () => {
  const [size, setSize] = useState<number>(0);

  // center text when panel opens
  const { range } = useBottomSheet();
  const left = range([0, (width - size) / 2]);

  return (
    <Animated.View style={{ left }}>
      <Text
        size={15}
        color={Colors.light}
        numberOfLines={1}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;

          if (Math.round(size) !== Math.round(width)) {
            setSize(width);
          }
        }}>
        OneRepublic
      </Text>
    </Animated.View>
  );
};
