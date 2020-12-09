import React from 'react';
import { View, StyleSheet } from 'react-native';

import { IPlaylist } from 'src/interfaces';
import { Text } from 'src/components';

interface Props extends IPlaylist {}

export const Item: React.FC<Props> = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Text size={18}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 25,
  },
});
