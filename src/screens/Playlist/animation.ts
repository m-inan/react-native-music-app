import { useRef, useEffect } from 'react';
import { Animated, Easing, PanResponder, Dimensions } from 'react-native';

import { useAnimatedValues } from 'src/utils';

const { width } = Dimensions.get('window');

const THRESHOLD = width / 10;

export const useAnimation = (size: number) => {
  const [translateX, startX, endX, index] = useAnimatedValues(0, 0, 0, 0);

  useEffect(() => {
    index.addListener(animation);
  }, []);

  function setPlaylistsIndex(value: number) {
    index.setValue(value);
  }

  function next(): void {
    // increase index value
    const currentIndex = (index as any)._value;
    if (currentIndex < size - 1) {
      index.setValue(currentIndex + 1);
    }
  }

  function prev(): void {
    // deincrease index value
    const currentIndex = (index as any)._value;

    if (currentIndex > 0) {
      index.setValue(currentIndex - 1);
    }
  }

  function animation(): void {
    const currentIndex = (index as any)._value;

    const value = currentIndex * width * -1;

    Animated.timing(translateX, {
      toValue: value,
      duration: 300,
      easing: Easing.bezier(0, -0.05, 0.15, 0.98),
      useNativeDriver: true,
    }).start();
  }

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (_event, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy),
      onMoveShouldSetPanResponder: (_event, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy),

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
        const { dx } = gestureState;

        // set offset value for `onPanResponderRelease` action
        endX.setValue(dx);

        const start = (startX as any)._value;
        const end = (endX as any)._value;

        // get current index and position
        const currentIndex = (index as any)._value;
        const currentOffset = currentIndex * width;

        const movement = end - start;

        if (
          (currentIndex > 0 || movement < 0) &&
          (currentIndex < size - 1 || movement > 0)
        ) {
          translateX.setValue(movement - currentOffset);
        }
      },
      onPanResponderRelease: () => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        const start = (startX as any)._value;
        const end = (endX as any)._value;

        const movement = end ? end - start : 0;

        if (movement > THRESHOLD) {
          prev();
        } else if (movement < -THRESHOLD) {
          next();
        } else {
          animation();
        }
      },
    }),
  ).current;

  return { translateX, panResponder, setPlaylistsIndex, index, next, prev };
};
