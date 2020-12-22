import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors, Dimensions } from 'src/constants';

import { useBottomSheet } from '../Context';

const { width, sliderRatio } = Dimensions;

interface Props {}

export const Slider: React.FC<Props> = () => {
  const { interpolate, snap } = useBottomSheet();

  // bottom sheet positions
  const inputRange = [snap.top, snap.middle, snap.bottom];

  const opacity = interpolate(inputRange, [1, 0, 0]);
  const translateY = interpolate(inputRange, [0, 100, 100]);

  return (
    <Animated.View
      style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <Svg style={styles.svg} viewBox={`0 0 100 ${100 / sliderRatio}`}>
        <Path
          fill="none"
          stroke={Colors.primary}
          strokeWidth={5}
          d={`M-25 5 A 50 50 0 0 0 125 5`}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  svg: {
    width: width,
    height: width / sliderRatio / 2,
  },
});
