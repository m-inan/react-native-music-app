import React, { useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  STATE_PLAYING,
  STATE_PAUSED,
  TrackPlayerEvents,
} from 'react-native-track-player';

import { usePlayer } from 'src/provider';
import { Play, Pause } from 'src/icons';

import { useBottomSheet } from '../Context';

interface Props {}

const { PLAYBACK_STATE } = TrackPlayerEvents;

export const PlayPause: React.FC<Props> = () => {
  const { isPlaying, setPlaying } = usePlayer();

  const { range } = useBottomSheet();

  const size = range([50, 60]);
  const backgroundColor = range([
    'rgba(255, 255, 255, 0.05)',
    'rgba(255, 255, 255, 0)',
  ]);

  useTrackPlayerEvents([PLAYBACK_STATE], (event: any) => {
    if (event.type === PLAYBACK_STATE) {
      if (event.state === STATE_PLAYING) {
        setPlaying(true);
      } else if (event.state === STATE_PAUSED) {
        setPlaying(false);
      }
    }
  });

  return (
    <TouchableOpacity
      onPress={() => {
        TrackPlayer[isPlaying ? 'pause' : 'play']();
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
