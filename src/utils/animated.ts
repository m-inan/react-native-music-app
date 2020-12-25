import { useRef } from 'react';
import { Animated } from 'react-native';

export function useAnimatedValue(value: number) {
  return useRef<Animated.Value>(new Animated.Value(value)).current;
}

export function useAnimatedValues(...values: number[]) {
  return values.map((value) => useAnimatedValue(value));
}
