import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  findNodeHandle,
  Image,
} from 'react-native';

import { Dimensions } from 'src/constants';
import { usePlayer } from 'src/provider';

import { sliderRatio, minDeviceRatio } from '../Slider/Dimensions';
import { useBottomSheet } from '../Context';

interface Props {}

const { width } = Dimensions;

const dimension = width / sliderRatio - 60;
const radius = dimension / 2;

export const Record: React.FC<Props> = () => {
  const { track } = usePlayer();

  const marker = useRef<View>();

  const [measureY, setMeasureY] = useState(0);
  const { range, container } = useBottomSheet();

  const size = range([70, dimension]);
  const padding = range([5, 15]);
  const translateY = range([-measureY, 0]);
  const translateX = range([-(radius + (minDeviceRatio ? 30 : 15)), 0]);

  useEffect(() => {
    if (typeof container?.current !== null) {
      marker.current?.measureLayout(
        // @ts-ignore
        findNodeHandle(container?.current ?? 0),
        (...measure) => {
          setMeasureY(measure[1] - 15);
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
          padding,
          width: size,
          height: size,
          transform: [{ translateX }, { translateY }],
        },
      ]}
      pointerEvents="none">
      <View style={[styles.circle, { borderRadius: 999 }]}>
        {track.artwork ? (
          <Image
            source={track.artwork}
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'absolute',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,.5)',
    top: 0,
  },
  circle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});
