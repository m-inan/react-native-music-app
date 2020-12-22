import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

import { Dimensions } from 'src/constants';
import { Text } from 'src/components';
import { Back, Search, Options } from 'src/icons';

import { useBottomSheet } from '../Context';

interface Props {}

export const Header: React.FC<Props> = () => {
  const { interpolate, snap } = useBottomSheet();

  const opacity = interpolate([snap.top, 100, snap.bottom], [1, 0, 0]);

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
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    width: '100%',
    paddingHorizontal: 24,
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
