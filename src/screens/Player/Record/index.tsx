import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, StyleSheet, findNodeHandle } from 'react-native';

import { Dimensions } from 'src/constants';

import { sliderRatio } from '../Slider/Dimensions';
import { useBottomSheet } from '../Context';

interface Props {}

const { width } = Dimensions;

const dimension = width / sliderRatio - 60;
const radius = dimension / 2;

export const Record: React.FC<Props> = () => {
  const marker = useRef<View>();

  const [measureY, setMeasureY] = useState(0);
  const { range, container } = useBottomSheet();

  const size = range([80, dimension]);
  const translateY = range([-measureY, 0]);
  const translateX = range([-radius, 0]);

  useEffect(() => {
    if (typeof container?.current !== null) {
      marker.current?.measureLayout(
        // @ts-ignore
        findNodeHandle(container?.current ?? 0),
        (...measure) => {
          setMeasureY(measure[1] - 10);
        },
        () => {},
      );
    }
  }, [marker]);

  return (
    <Animated.View
      ref={marker}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ translateX }, { translateY }],
        },
      ]}
      pointerEvents="none">
      <View style={styles.circle} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  circle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
