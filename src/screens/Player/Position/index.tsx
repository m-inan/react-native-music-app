import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  withTiming,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { getPosition, getDuration } from 'react-native-track-player';

import { Colors } from 'src/constants';
import { usePlayer } from 'src/provider';

import { useAnimation } from '../Context';

const window = Dimensions.get('window');

let timeout: any;

interface Props {}

export const Position: React.FC<Props> = () => {
  const { track, isPlaying } = usePlayer();

  const { percent } = useAnimation();

  const position = useSharedValue(0);

  useEffect(() => {
    clearTimeout(timeout);

    position.value = withTiming(0, {
      duration: 500,
    });

    setCurrentPosition();
  }, [track]);

  useEffect(() => {
    clearTimeout(timeout);

    if (isPlaying) {
      setTimeout(setCurrentPosition, 1000);
    }
  }, [isPlaying]);

  const setCurrentPosition = async () => {
    const p = await getPosition();
    const d = await getDuration();

    if (p > 0 && d > 0) {
      const value = (p * 100) / d;

      position.value = withTiming(value, {
        duration: 1000,
        easing: Easing.linear,
      });
    }

    timeout = setTimeout(setCurrentPosition, 1000);
  };

  const width = useDerivedValue(() => {
    return interpolate(position.value, [0, 100], [0, window.width]);
  });

  const opacity = useDerivedValue(() => {
    return interpolate(percent.value, [0, 80], [1, 0]);
  });

  const style = useAnimatedStyle(() => {
    return {
      width: width.value,
      opacity: opacity.value,
    };
  });

  return <Animated.View style={[styles.container, style]} />;
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
