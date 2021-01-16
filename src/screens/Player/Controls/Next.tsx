import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { Next as IconNext } from 'src/icons';

import { useBottomSheet } from '../Context';

interface Props {}

export const Next: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const opacity = range([0, 0, 1]);
  const size = range([30, 35]);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('next');
        TrackPlayer.skipToNext();
      }}>
      <Animated.View style={{ width: size, height: size }}>
        <IconNext size={'100%'} opacity={opacity} />
      </Animated.View>
    </TouchableOpacity>
  );
};
