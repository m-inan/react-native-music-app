import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { IPlaylist } from 'src/interfaces';
import { Text, TextType } from 'src/components';

interface Props {
  playlists: IPlaylist[];
  swipeIndex: Animated.Value;
}

export const Title: React.FC<Props> = ({ swipeIndex, playlists }: Props) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    swipeIndex.addListener(({ value }: { value: number }) => {
      setIndex(value);
    });
  }, []);

  const title = playlists[index].title ?? '';

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
