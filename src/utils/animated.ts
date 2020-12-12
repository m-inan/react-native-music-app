import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimatedValue = (value: number) => {
  return useRef<Animated.Value>(new Animated.Value(value)).current;
};
