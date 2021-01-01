import { useRef, useState, useEffect } from 'react';
import { Animated, Easing, PanResponder } from 'react-native';

import { Dimensions } from 'src/constants';
import { useAnimatedValue, interpolate, clamp } from 'src/utils';

const { width } = Dimensions;

const centerX = width / 2;
const centerY = 0;

let timeout: any;

export const useSlider = () => {
  const [touching, setTouching] = useState<boolean>();

  const percent = useAnimatedValue(0);
  const offsetY = useAnimatedValue(0);

  useEffect(() => {
    clearTimeout(timeout);
    if (!touching) {
      timeout = setTimeout(getDuration, 500);
    }
  }, [touching]);

  const getDuration = () => {
    let value = (percent as any)._value + 1;
    value = clamp(value, 0, 100);

    if (!touching) {
      Animated.timing(percent, {
        toValue: value,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }

    if (value <= 100) {
      timeout = setTimeout(getDuration, 500);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminate: () => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },

      onPanResponderGrant: ({ nativeEvent }) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now

        setTouching(true);

        const { pageY, locationY, locationX } = nativeEvent;

        offsetY.setValue(pageY - locationY);

        const diffY = locationY - centerY;
        const diffX = locationX - centerX;

        const a = Math.atan2(diffY, diffX);
        const percentage = interpolate(a, [Math.PI, 0], [0, 100]);

        percent.setValue(percentage);
      },
      onPanResponderMove: ({ nativeEvent }) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        const offset = (offsetY as any)._value;

        const { locationX, pageY } = nativeEvent;

        let withOffset = pageY - offset;

        if (withOffset < 0) {
          withOffset = 0;
        }

        const diffY = withOffset - centerY;
        const diffX = locationX - centerX;

        const tetha = Math.atan2(diffY, diffX);
        const percentage = interpolate(tetha, [Math.PI, 0], [0, 100]);

        percent.setValue(percentage);
      },
      onPanResponderRelease: () => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        setTouching(false);
      },
    }),
  ).current;

  return { panResponder, percent, touching };
};
