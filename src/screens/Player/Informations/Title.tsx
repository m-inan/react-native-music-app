import React, { useState } from 'react';
import { Animated } from 'react-native';

import { Colors, Dimensions } from 'src/constants';
import { usePlayer } from 'src/provider';
import { Text } from 'src/components';
import { useBottomSheet } from '../Context';

const { width } = Dimensions;

interface Props {}

export const Title: React.FC<Props> = () => {
  const [size, setSize] = useState<number>(0);

  const { track } = usePlayer();

  // center text when panel opens
  const { range } = useBottomSheet();
  const left = range([0, (width - size) / 2]);

  return (
    <Animated.View style={{ left }}>
      <Text
        size={17}
        color={Colors.blue}
        numberOfLines={1}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;

          if (Math.floor(size) !== Math.floor(width)) {
            setSize(width);
          }
        }}>
        {track.title}
      </Text>
    </Animated.View>
  );
};
