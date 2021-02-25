import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import { useAnimation } from '../Context';
import { WIDTH, HANDLE_HEIGHT, MINI_CONTROL_WIDTH } from '../Dimensions';

interface Props {
  gestureHandler: (event: PanGestureHandlerGestureEvent) => void;
}

export const Handle: React.FC<Props> = ({ gestureHandler }: Props) => {
  const { percent } = useAnimation();

  const width = useDerivedValue(() => {
    return interpolate(
      percent.value,
      [0, 100],
      [WIDTH - MINI_CONTROL_WIDTH, WIDTH],
    );
  });

  const style = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, style]}></Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HANDLE_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: 'transparent',
  },
});
