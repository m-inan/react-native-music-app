import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Rect, Defs, Stop, LinearGradient } from 'react-native-svg';

import { Colors } from 'src/constants';

export const CornerShadow = () => (
  <Svg
    style={styles.container}
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
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.primary,
  },
});
