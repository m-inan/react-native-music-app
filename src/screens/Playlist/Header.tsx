import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Search, Gear, DoubleQuaver } from 'src/icons';

export const Header = () => {
  return (
    <View style={styles.container}>
      <Search size={28} />
      <DoubleQuaver size={35} />
      <Gear size={28} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
