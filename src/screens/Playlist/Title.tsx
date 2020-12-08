import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from 'src/constants';

interface Props {}

export const Title: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rock</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
