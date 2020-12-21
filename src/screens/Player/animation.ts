import { useRef } from 'react';
import { PanResponder, Animated, Easing } from 'react-native';

import { Dimensions } from 'src/constants';
import { useAnimatedValue } from 'src/utils';

const { MINI_PLAYER_POS, THRESHOLD } = Dimensions;

export const useAnimation = () => {
  const translateY = useAnimatedValue(MINI_PLAYER_POS);
  const transitionY = useAnimatedValue(0);
  const status = useAnimatedValue(0);

  function animation(): void {
    const isOpen = (status as any)._value;

    const value = isOpen ? 0 : MINI_PLAYER_POS;

    Animated.timing(translateY, {
      toValue: value,
      duration: 300,
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
        const offset = isOpen ? 0 : MINI_PLAYER_POS;

        translateY.setValue(offset + dy);
        transitionY.setValue(dy);
      },
      onPanResponderRelease: () => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        const isOpen = (status as any)._value;

        const transition = (transitionY as any)._value;

        if (!isOpen && transition < -THRESHOLD) {
          status.setValue(1);
        } else if (isOpen && transition > THRESHOLD) {
          status.setValue(0);
        }

        // run animation
        animation();
      },
    }),
  ).current;

  return { translateY, panResponder };
};
