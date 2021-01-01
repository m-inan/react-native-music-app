import React, { useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

import { Play, Pause } from 'src/icons';

import { useBottomSheet } from '../Context';

interface Props {}

export const PlayPause: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const [isPlaying, setPlaying] = useState<boolean>(false);

  const size = range([50, 60]);
  const backgroundColor = range([
    'rgba(255, 255, 255, .05)',
    'rgba(255, 255, 255, 0)',
  ]);

  return (
    <TouchableOpacity
      onPress={() => {
        setPlaying(!isPlaying);
      }}>
      <Animated.View
        style={{
          width: size,
          height: size,
          padding: 10,
          paddingLeft: 12,
          backgroundColor,
          borderRadius: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isPlaying ? <Pause size={'100%'} /> : <Play size={'100%'} />}
      </Animated.View>
    </TouchableOpacity>
  );
};
