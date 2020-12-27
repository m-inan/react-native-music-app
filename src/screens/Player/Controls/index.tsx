import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, StyleSheet, findNodeHandle } from 'react-native';

import { Colors, Dimensions } from 'src/constants';

import { useBottomSheet } from '../Context';
import { Informations } from './Informations';
import { Actions } from './Actions';

interface Props {}

export const Controls: React.FC<Props> = () => {
  const marker = useRef<View>();

  const [measureY, setMeasureY] = useState(0);
  const { range, container } = useBottomSheet();

  const width = range([Dimensions.width - 100, Dimensions.width]);
  const height = range([50, 150]);

  const translateY = range([-measureY + 15, 0]);
  const translateX = range([100, 0]);

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
      ]}>
      <Informations />
      <Actions />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.primary,
  },
});
