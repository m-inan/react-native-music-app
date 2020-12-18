import React from 'react';
import { Text, StyleSheet, Dimensions, Animated } from 'react-native';

import { Colors } from 'src/constants';

import { useAnimation } from './animation';

const { width, height } = Dimensions.get('window');

interface Props {}

export const Player: React.FC<Props> = () => {
  const { panResponder, translateY } = useAnimation();

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Animated.View {...panResponder.panHandlers} style={styles.holder} />

      <Text style={styles.text}>Player area</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
    backgroundColor: Colors.background,
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
