import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Svg, { Rect, Defs, Stop, LinearGradient } from 'react-native-svg';

import { Colors } from 'src/constants';

import { List } from './List';

interface Props {}

export const Tracks: React.FC<Props> = () => {
  return (
    <View style={styles.area}>
      <Svg
        style={styles.shadow}
        width="38"
        height="39"
        viewBox="0 0 38 39"
        fill="none">
        <Rect width="38" height="39" fill="url(#paint0_linear)" />
        <Defs>
          <LinearGradient
            id="paint0_linear"
            x1="16.5"
            y1="42.5"
            x2="12"
            y2="1.5"
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#1F1D1D" />
            <Stop offset="1" stopColor="#1F1D1D" stopOpacity="0" />
          </LinearGradient>
        </Defs>
      </Svg>
      <View style={styles.container}>
        <ScrollView>
          <List />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    position: 'relative',
    flex: 1,
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 36,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.primary,
  },
});
