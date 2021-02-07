import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { Previous as IconPrevious } from 'src/icons';

import { useBottomSheet } from '../Context';

interface Props {}

export const Previous: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const opacity = range([0, 0, 1]);
  const size = range([30, 35]);

  return (
    <TouchableOpacity
      onPress={async () => {
        console.log('previous');
        const position = await TrackPlayer.getPosition();

        if (position > 3) {
          TrackPlayer.seekTo(0);
        } else {
          TrackPlayer.skipToPrevious();
        }
      }}>
      <Animated.View style={{ width: size, height: size }}>
        <IconPrevious size={'100%'} opacity={opacity} />
      </Animated.View>
    </TouchableOpacity>
  );
};
