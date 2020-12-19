import React from 'react';
import { Text, StyleSheet, Dimensions, Animated } from 'react-native';

import { Colors } from 'src/constants';

import { Handle } from './Handle';
import { useAnimation } from './Animation';
import { Context } from './Context';

const { width } = Dimensions.get('window');

interface Props {}

export const Player: React.FC<Props> = () => {
  const { panResponder, translateY } = useAnimation();

  return (
    <Context.Provider value={{ translateY }}>
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}>
        <Handle panResponder={panResponder} />
        <Text style={styles.text}>Player area</Text>
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
    justifyContent: 'center',
    position: 'absolute',
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
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
