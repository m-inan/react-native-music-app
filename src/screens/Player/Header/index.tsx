import React from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';

import { Dimensions } from 'src/constants';
import { Text } from 'src/components';
import { Back, Search, Options } from 'src/icons';

import { useBottomSheet } from '../Context';

interface Props {}

export const Header: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const opacity = range([0, 0, 1]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: Dimensions.MINI_PLAYER_HEIGHT,
    paddingTop: Dimensions.topInset,
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
