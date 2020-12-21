import React from 'react';
import { StyleSheet, Animated } from 'react-native';

import { Colors, Dimensions } from 'src/constants';

import { Handle } from './Handle';
import { Header } from './Header';
import { Context } from './Context';
import { useAnimation } from './Animation';

const { width } = Dimensions;

interface Props {}

export const Player: React.FC<Props> = () => {
  const { panResponder, translateY } = useAnimation();

  const interpolate = (
    inputRange: number[],
    outputRange: string[] | number[],
  ) => {
    return translateY.interpolate({
      inputRange,
      outputRange,
    });
  };

  return (
    <Context.Provider value={{ translateY, interpolate }}>
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}>
        <Handle panResponder={panResponder} />

        <Header />
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
    position: 'absolute',
    backgroundColor: Colors.foreground,
  },

  text: {
    fontSize: 25,
    color: Colors.white,
    textAlign: 'center',
  },

  holder: {
    height: 100,
    width: '100%',
    backgroundColor: Colors.primary,
  },
});
