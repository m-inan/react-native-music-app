import React, { useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { Colors } from 'src/constants';
import { Repeat as Icon } from 'src/icons';

import { useBottomSheet } from '../Context';

interface Props {}

export const Repeat: React.FC<Props> = () => {
  const [active, setActive] = useState<boolean>(false);

  const { range } = useBottomSheet();
  const opacity = range([80, 100], [0, 1]);

  const onPress = () => {
    console.log('repeat');
    TrackPlayer.setRepeatMode(!active);
    setActive(!active);
  };

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <TouchableOpacity onPress={onPress}>
        <Icon fill={active ? Colors.primary : Colors.light} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 40,
  },
});
