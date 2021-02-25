import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { setRepeatMode } from 'react-native-track-player';
import Animated, {
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Colors } from 'src/constants';
import { Repeat as Icon } from 'src/icons';

import { useAnimation } from '../Context';

interface Props {}

export const Repeat: React.FC<Props> = () => {
  const { percent } = useAnimation();

  const [active, setActive] = useState<boolean>(false);

  const onPress = () => {
    setRepeatMode(!active);
    setActive(!active);
  };

  const opacity = useDerivedValue(() => {
    return interpolate(percent.value, [0, 90, 100], [0, 0, 1]);
  });

  const style = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  return (
    <Animated.View style={[styles.container, style]}>
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
