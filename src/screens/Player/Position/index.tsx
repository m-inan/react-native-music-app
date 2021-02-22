import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { getPosition, getDuration } from 'react-native-track-player';

import { Colors } from 'src/constants';
import { usePlayer } from 'src/provider';
import { useAnimatedValue } from 'src/utils';

import { useBottomSheet } from '../Context';

interface Props {}

export const Position: React.FC<Props> = () => {
  const { isPlaying } = usePlayer();
  const { range } = useBottomSheet();

  const percent = useAnimatedValue(0);
  const opacity = range([80, 100], [1, 0]);

  useEffect(() => {
    if (isPlaying) {
      setTimeout(setCurrentPosition, 1000);
    }
  }, [isPlaying]);

  const setCurrentPosition = async () => {
    const p = await getPosition();
    const d = await getDuration();

    if (p > 0 && d > 0) {
      const value = (p * 100) / d;

      Animated.timing(percent, {
        toValue: value,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      setTimeout(setCurrentPosition, 1000);
    }
  };

  const width = percent.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return <Animated.View style={[styles.container, { opacity, width }]} />;
};

const styles = StyleSheet.create({
  container: {
    top: -3,
    left: 0,
    height: 3,
    position: 'absolute',
    backgroundColor: Colors.primary,
  },
});
