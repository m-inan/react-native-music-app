import React from 'react';
import { Animated, StyleSheet, PanResponderInstance } from 'react-native';

import { Dimensions } from 'src/constants';

interface Props {
  panResponder: PanResponderInstance;
}

export const Handle: React.FC<Props> = ({ panResponder }: Props) => {
  return (
    <Animated.View style={styles.container} {...panResponder.panHandlers} />
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    zIndex: 9,
    position: 'absolute',
    width: '100%',
    height: Dimensions.MINI_PLAYER_HEIGHT,
  },
});
