import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimatedValue = (value: number) => {
  return useRef<Animated.Value>(new Animated.Value(value)).current;
};

export const useAnimatedValues = (...values: number[]) => {
  return values.map((value) => useAnimatedValue(value));
};
