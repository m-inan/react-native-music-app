import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text, TextType } from 'src/components';

interface Props {}

export const Title: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text size={30} type={TextType.SEMIBOLD}>
        Rock
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 20,
    justifyContent: 'center',
  },
});
