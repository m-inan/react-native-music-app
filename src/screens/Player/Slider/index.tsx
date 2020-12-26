import React, { useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

import { Colors, Dimensions } from 'src/constants';
import { useAnimatedValues, useAnimatedValue, interpolate } from 'src/utils';
import { useBottomSheet } from '../Context';

import { useSlider } from './Animation';
import { sliderHeight } from './Dimensions';

const { width } = Dimensions;

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {}

const strokeDasharray = 157.10174560546875;
const d = 'M0 5 A 50 50 0 0 0 100 5';

export const Slider: React.FC<Props> = () => {
  // bottom sheet position
  const { position, range, percent: BSPercent } = useBottomSheet();
  const opacity = range([0, 70, 100], [0, 0, 1]);
  const translateY = range([0, 50, 100], [100, 50, 0]);

  // slider animation
  const { panResponder, percent } = useSlider();
  const [circleX, circleY] = useAnimatedValues(0, 0);
  const strokeDashoffset = useAnimatedValue(strokeDasharray);

  useEffect(() => {
    // slider percent
    percent.addListener(setAnimationValues);

    // bottomsheet position
    position.addListener(setAnimationValues);

    // Initial Animation Values
    setAnimationValues();
  }, []);

  const setAnimationValues = () => {
    let value = (percent as any)._value - 100 + (BSPercent as any)._value;

    // limit value between 0..100
    value = Math.min(Math.max(0, value), 100);

    const angle = interpolate(value, [0, 100], [Math.PI, 0]);

    const cx = 50 + 50 * Math.cos(angle);
    const cy = 5 + 50 * Math.sin(angle);

    const stroke = interpolate(value, [0, 100], [strokeDasharray, 0]);

    circleX.setValue(cx);
    circleY.setValue(cy);

    strokeDashoffset.setValue(stroke);
  };

  return (
    <Animated.View
      style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <Svg style={styles.svg} viewBox={`0 0 100 60`}>
        <Path
          d={d}
          fill="none"
          strokeWidth={2}
          stroke={Colors.mute}
          pointerEvents="none"
        />
        <AnimatedCircle
          r={4}
          cx={circleX}
          cy={circleY}
          pointerEvents="none"
          fill={Colors.primary}
        />
        <AnimatedCircle
          r={5}
          cx={circleX}
          cy={circleY}
          pointerEvents="none"
          fill={'rgba(227, 42, 118, .3)'}
        />
        <AnimatedPath
          d={d}
          fill="none"
          stroke={'rgba(227, 42, 118, .3)'}
          strokeWidth={4}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
        <AnimatedPath
          {...panResponder.panHandlers}
          d={d}
          fill="none"
          stroke={Colors.primary}
          strokeWidth={2}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  svg: {
    width: width,
    height: sliderHeight,
  },
});
