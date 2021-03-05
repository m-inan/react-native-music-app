import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text, TextType } from 'src/components';
import { usePlaylist } from 'src/provider';

export const Title = () => {
  const { lists, swipeIndex } = usePlaylist();

  const text = lists.find((_, key) => key === swipeIndex)?.title ?? 'Null';

  return (
    <View style={styles.container}>
      <Text size={30} type={TextType.SEMIBOLD}>
        {text}
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
