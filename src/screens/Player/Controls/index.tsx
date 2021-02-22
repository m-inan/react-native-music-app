import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, StyleSheet, findNodeHandle } from 'react-native';

import { Dimensions } from 'src/constants';

import { useBottomSheet } from '../Context';
import { miniActionsWidth, miniInformationWidth } from '../Dimensions';

import { Next } from './Next';
import { Previous } from './Previous';
import { PlayPause } from './PlayPause';

interface Props {}

export const Controls: React.FC<Props> = () => {
  const marker = useRef<View>();

  const [measureY, setMeasureY] = useState(0);
  const { range, container } = useBottomSheet();

  const height = range([50, 75]);
  const width = range([miniActionsWidth, Dimensions.width]);
  const size = range(['100%', '50%']);
  const paddingRight = range([5, 0]);

  const translateX = range([miniInformationWidth + 100, 0]);
  const translateY = range([-measureY - 35, 55]);

  useEffect(() => {
    if (typeof container?.current !== null) {
      marker.current?.measureLayout(
        // @ts-ignore
        findNodeHandle(container?.current ?? 0),
        (...measure) => {
          setMeasureY(measure[1] - 60);
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
          width,
          height,
          paddingRight,
          transform: [{ translateX }, { translateY }],
        },
      ]}>
      <Animated.View style={[styles.content, { width: size }]}>
        <Previous />
        <PlayPause />
        <Next />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 9,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
