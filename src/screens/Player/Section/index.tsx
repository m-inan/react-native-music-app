import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { WIDTH, SECTION_HEIGHT } from '../Dimensions';

import { Record } from './Record';
import { Slider } from './Slider';
import { Duration } from './Duration';
import { Shuffle } from './Shuffle';
import { Repeat } from './Repeat';

export const Section = () => {
  const offsetY = useSharedValue(0);

  const [time, setTime] = useState<number>(0);
  const [isTouching, setTouching] = useState<boolean>(false);

  const onLayout = useCallback(({ nativeEvent: { layout } }) => {
    offsetY.value = layout.y;
  }, []);

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Record {...{ offsetY }} />
      <Slider {...{ isTouching, setTouching, setTime }} />
      <Duration {...{ time, isTouching }} />
      <Shuffle />
      <Repeat />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: SECTION_HEIGHT,
    justifyContent: 'flex-end',
  },
});
