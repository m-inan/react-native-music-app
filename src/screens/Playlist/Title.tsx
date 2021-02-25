import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text, TextType } from 'src/components';

export const Title = () => {
  return (
    <View style={styles.container}>
      <Text size={30} type={TextType.SEMIBOLD}>
        Pop
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
