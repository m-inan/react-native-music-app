import React, { Fragment } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { Colors } from 'src/constants';
import { Text } from 'src/components';

import { useBottomSheet } from '../Context';

interface Props {}

export const Duration: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const opacity = range([80, 100], [0, 1]);

  return (
    <Fragment>
      <Animated.View style={[styles.time, { opacity }]}>
        <Text color={Colors.light}>01:33</Text>
      </Animated.View>
      <Animated.View style={[styles.duration, { opacity }]}>
        <Text color={Colors.light}>02:33</Text>
      </Animated.View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  time: {
    top: '40%',
    width: 50,
    height: 20,
    left: 10,
    marginTop: -20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  duration: {
    top: '40%',
    width: 50,
    height: 20,
    right: 10,
    marginTop: -20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
