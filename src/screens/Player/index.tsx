import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { Colors, Dimensions } from 'src/constants';

import { Handle } from './Handle';
import { Header } from './Header';
import { Slider } from './Slider';
import { Context } from './Context';
import { useAnimation } from './Animation';

import { sliderRatio } from './Slider/Dimensions';

const { width, bottomInset, PLAYER_SNAP_BOTTOM, PLAYER_SNAP_TOP } = Dimensions;

const snap = {
  top: PLAYER_SNAP_TOP,
  middle: PLAYER_SNAP_BOTTOM / 2,
  bottom: PLAYER_SNAP_BOTTOM,
};

interface Props {}

export const Player: React.FC<Props> = () => {
  const { panResponder, translateY, percent } = useAnimation();

  const range = (inputRange: number[], outputRange: string[] | number[]) => {
    return percent.interpolate({
      inputRange: inputRange,
      outputRange: outputRange,
    });
  };

  return (
    <Context.Provider value={{ position: translateY, percent, range, snap }}>
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}>
        <Handle panResponder={panResponder} />

        <View style={styles.header}>
          <Header />
        </View>

        <View style={[styles.section, styles.slider]}>
          <Slider />
        </View>
        <View style={[styles.section, styles.controls]}></View>
        <View style={[styles.section, styles.nextPrev]}></View>
      </Animated.View>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: '100%',
    flex: 1,
    alignItems: 'center',
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
