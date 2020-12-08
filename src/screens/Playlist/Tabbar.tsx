import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from 'src/constants';
import { Text, TextType } from 'src/components';

interface Props {}

export const Tabbar: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pop</Text>
      <Text style={styles.text} type={TextType.SEMIBOLD}>
        Rock
      </Text>
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
    paddingRight: 25,
  },
});
