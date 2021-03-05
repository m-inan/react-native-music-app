import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  withSpring,
  interpolate,
  Extrapolate,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import { Context } from './Context';
import { Handle } from './Handle';
import { Position } from './Position';
import { Header } from './Header';
import { Section } from './Section';
import { Actions } from './Actions';
import { NextPrev } from './NextPrev';

import {
  WIDTH,
  HEIGHT,
  TOP_INSET,
  BOTTOM_INSET,
  SNAP_TOP,
  SNAP_BOTTOM,
} from './Dimensions';

export const Player = () => {
  const translateY = useSharedValue(SNAP_BOTTOM);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      const min = SNAP_BOTTOM;
      const max = SNAP_TOP;

      let value = ctx.startY + event.translationY;

      if (value > min) {
        value = min;
      } else if (value < max) {
        value = max;
      }

      translateY.value = value;
    },
    onEnd: (event) => {
      const velocity = event.velocityY;
      const toValue = velocity > 0 ? SNAP_BOTTOM : 0;

      translateY.value = withSpring(toValue, {
        velocity,
        stiffness: 40,
        overshootClamping: true,
      });
    },
  });

  const percent = useDerivedValue(() => {
    return interpolate(
      translateY.value,
      [SNAP_BOTTOM, SNAP_TOP],
      [0, 100],
      Extrapolate.CLAMP,
    );
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <Context.Provider value={{ percent }}>
      <Animated.View style={[styles.container, style]}>
        <Handle {...{ gestureHandler }} />
        <Position />
        <Header />
        <Section />
        <Actions />
        <NextPrev />
      </Animated.View>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',

    paddingTop: TOP_INSET,
    paddingBottom: BOTTOM_INSET,

    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(27, 35, 35)',
  },
});
