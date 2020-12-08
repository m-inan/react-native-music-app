import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from 'src/constants';

interface Props {}

export const Tabbar: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pop</Text>
      <Text style={[styles.text, styles.active]}>Rock</Text>
      <Text style={styles.text}>Classic</Text>
      <Text style={styles.text}>Baroque</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    paddingHorizontal: 25,
    paddingTop: 20,
    alignItems: 'flex-start',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    color: Colors.white,
    paddingRight: 25,
  },
  active: {
    fontWeight: 'bold',
  },
});
