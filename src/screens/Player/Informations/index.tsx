import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, StyleSheet, findNodeHandle } from 'react-native';

import { Dimensions } from 'src/constants';

import { useBottomSheet } from '../Context';
import { miniInformationWidth } from '../Dimensions';

import { Artist } from './Artist';
import { Title } from './Title';

interface Props {}

export const Informations: React.FC<Props> = () => {
  const marker = useRef<View>();

  const [measureY, setMeasureY] = useState(0);
  const { range, container } = useBottomSheet();

  const width = range([miniInformationWidth, Dimensions.width]);

  const translateX = range([100, 0]);
  const translateY = range([-measureY + 15, 0]);

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
      pointerEvents="none"
      ref={marker}
      style={[
        styles.container,
        {
          width,
          transform: [{ translateX }, { translateY }],
        },
      ]}>
      <Artist />
      <Title />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 55,
    alignItems: 'flex-start',
  },
});
