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

const radius = 50;
const cx = 50;
const cy = 5;

const d = `M0 ${cy} A ${radius} ${radius} 0 0 0 ${cx * 2} ${cy}`;

export const Slider: React.FC<Props> = () => {
  // bottom sheet position
  const { position, range, percent: BSPercent } = useBottomSheet();
  const opacity = range([0, 80, 100], [0, 0, 1]);
  const translateY = range([0, 50, 100], [50, 25, 0]);

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
    const bottomSheet = interpolate(
      (BSPercent as any)._value,
      [0, 100],
      [-100, 0],
    );

    let value = (percent as any)._value + bottomSheet;

    // limit value between 0..100
    value = Math.min(Math.max(0, value), 100);

    const angle = interpolate(value, [0, 100], [Math.PI, 0]);

    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    circleX.setValue(x);
    circleY.setValue(y);

    // duration percent and bottomSheet percent animation
    const stroke = interpolate(value, [0, 100], [strokeDasharray, 0]);

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
