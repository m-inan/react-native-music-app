import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { Colors } from 'src/constants';

import { List } from './List';

interface Props {
  swipeIndex: Animated.Value;
}

export const Tabbar: React.FC<Props> = ({ swipeIndex }: Props) => {
  return (
    <View style={styles.container}>
      <List {...{ swipeIndex }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    alignItems: 'flex-start',
    backgroundColor: Colors.primary,
  },
  content: {
    paddingLeft: 25,
    flexDirection: 'row',
  },
});
