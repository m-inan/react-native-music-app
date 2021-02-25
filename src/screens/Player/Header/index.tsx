import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Text } from 'src/components';
import { Back, Search, Options } from 'src/icons';

import { HEADER_HEIGHT } from '../Dimensions';
import { useAnimation } from '../Context';

interface Props {}

export const Header: React.FC<Props> = () => {
  const { percent } = useAnimation();

  const opacity = useDerivedValue(() => {
    return interpolate(percent.value, [80, 100], [0, 1]);
  });

  const style = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View pointerEvents="none" style={[styles.container, style]}>
      <View>
        <Back size={25} />
      </View>
      <View style={styles.middle}>
        <Text size={18}>NOW PLAYING</Text>
      </View>
      <View style={styles.right}>
        <Search size={25} />
        <Options size={25} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  middle: {
    flex: 1,
    alignItems: 'center',
  },

  right: {
    width: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
