import { useRef, useEffect } from 'react';
import { PanResponder, Animated, Easing, Platform } from 'react-native';

import { Dimensions } from 'src/constants';
import { useAnimatedValues, interpolate, clamp } from 'src/utils';

const { PLAYER_SNAP_BOTTOM, PLAYER_SNAP_TOP } = Dimensions;

export const useAnimation = () => {
  const [status, percent, velocityY, translateY] = useAnimatedValues(
    0,
    0,
    0,
    PLAYER_SNAP_BOTTOM,
    0,
  );

  useEffect(() => {
    translateY.addListener(({ value }: { value: number }) => {
      percent.setValue(
        interpolate(value, [PLAYER_SNAP_TOP, PLAYER_SNAP_BOTTOM], [100, 0]),
      );
    });

    status.addListener(animation);
  }, []);

  function animation(): void {
    const isOpen = (status as any)._value;
    const velocity = (velocityY as any)._value;
    const currentValue = (translateY as any)._value;
    const toValue = isOpen ? 0 : PLAYER_SNAP_BOTTOM;

    let duration = Math.abs(
      (toValue - Math.abs(currentValue)) / Math.abs(velocity),
    );

    // range
    duration = clamp(duration, 50, 3000);

    // android gives inconsistent values for `velocity` value.
    // `Duration` constant until problem is solved
    if (Platform.OS === 'android') {
      duration = 700;
    }

    Animated.timing(translateY, {
      toValue,
      duration,
      easing: Easing.bezier(0, -0.05, 0.15, 0.98),
      useNativeDriver: true,
    }).start();
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderTerminate: () => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        animation();
      },

      onPanResponderGrant: (_event) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (_event, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        const { dy } = gestureState;

        const isOpen = (status as any)._value;
        const offset = isOpen ? 0 : PLAYER_SNAP_BOTTOM;

        const value = clamp(offset + dy, 0, PLAYER_SNAP_BOTTOM);

        translateY.setValue(value);
      },
      onPanResponderRelease: (_event, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        velocityY.setValue(gestureState.vy);

        if (gestureState.vy < 0) {
          status.setValue(1);
        } else if (gestureState.vy > 0) {
          status.setValue(0);
        } else {
          animation();
        }
      },
    }),
  ).current;

  return { translateY, panResponder, percent, status };
};
