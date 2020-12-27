import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, StyleSheet, findNodeHandle } from 'react-native';

import { Colors, Dimensions } from 'src/constants';

import { useBottomSheet } from '../Context';

interface Props {}

export const Controls: React.FC<Props> = () => {
  const marker = useRef<View>();

  const [measureY, setMeasureY] = useState(0);
  const { range, container } = useBottomSheet();

  const width = range([200, Dimensions.width]);
  const height = range([50, 150]);

  const translateY = range([-measureY + 15, 0]);
  const translateX = range([Dimensions.width - 220, 0]);

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
          width,
          height,
          transform: [{ translateX }, { translateY }],
        },
      ]}></Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: Colors.primary,
  },
});
