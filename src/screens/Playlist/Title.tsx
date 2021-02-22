import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { usePlaylist } from 'src/provider';
import { Text, TextType } from 'src/components';

interface Props {
  swipeIndex: Animated.Value;
}

export const Title: React.FC<Props> = ({ swipeIndex }: Props) => {
  const { lists } = usePlaylist();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    swipeIndex.addListener(({ value }: { value: number }) => {
      setIndex(value);
    });
  }, []);

  const title = lists[index]?.title ?? '';

  return (
    <View style={styles.container}>
      <Text size={30} type={TextType.SEMIBOLD}>
        {title}
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
