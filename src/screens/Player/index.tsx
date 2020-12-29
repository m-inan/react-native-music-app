import React, { useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { Colors, Dimensions } from 'src/constants';

import { Handle } from './Handle';
import { Header } from './Header';
import { Slider } from './Slider';
import { Record } from './Record';
import { Controls } from './Controls';
import { Context } from './Context';
import { useAnimation } from './Animation';

import { sliderRatio } from './Slider/Dimensions';

const { width, bottomInset } = Dimensions;

interface Props {}

export const Player: React.FC<Props> = () => {
  const { panResponder, translateY, percent, status } = useAnimation();

  const container = useRef<View>();

  const range = (
    inputRange: string[] | number[],
    outputRange?: string[] | number[],
  ) => {
    if (typeof outputRange === 'undefined') {
      outputRange = inputRange;
      inputRange = [0];

      // Divide 100 equally by the number of inputRange
      // length is `5` outputRange equal [0, 25, 50, 75, 100]
      const length = outputRange.length;
      const j = length - 1;

      for (var i = 1; i <= j; i++) {
        const r = (100 / j) * i;

        inputRange.push(r);
      }
    }

    return percent.interpolate({
      // @ts-ignore
      inputRange: inputRange,
      outputRange: outputRange,
    });
  };

  return (
    <Context.Provider
      value={{ position: translateY, percent, range, status, container }}>
      <Animated.View
        ref={container}
        style={[styles.container, { transform: [{ translateY }] }]}>
        <Handle panResponder={panResponder} />

        <View style={styles.header}>
          <Header />
        </View>

        <View style={[styles.section, styles.slider]}>
          <Slider />
          <Record />
        </View>
        <View style={[styles.section, styles.controls]}>
          <Controls />
        </View>
        <View style={[styles.section, styles.nextPrev]}></View>
      </Animated.View>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: Dimensions.height,
    flex: 1,
    justifyContent: 'space-between',
    position: 'absolute',
    paddingBottom: bottomInset,
    backgroundColor: Colors.foreground,
  },

  text: {
    fontSize: 25,
    color: Colors.white,
    textAlign: 'center',
  },
  header: {},
  slider: {
    height: width / sliderRatio,
    alignItems: 'center',
  },
  controls: {
    height: 150,
  },
  nextPrev: {
    height: 180,
  },
  section: {
    width: '100%',
  },
});
