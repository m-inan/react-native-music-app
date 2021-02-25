import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Text } from 'src/components';
import { Colors } from 'src/constants';
import { usePlayer } from 'src/provider';

import { useAnimation } from '../Context';
import { WIDTH, MINI_HEIGHT, MINI_CONTROL_WIDTH } from '../Dimensions';

interface Props {
  offsetY: Animated.SharedValue<number>;
}

const offsetX = MINI_HEIGHT;
const MINI_WIDTH = WIDTH - (offsetX + MINI_CONTROL_WIDTH);

export const Content: React.FC<Props> = ({ offsetY }: Props) => {
  const { track } = usePlayer();

  const { percent } = useAnimation();

  const translateY = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [offsetY.value * -1, 0]);
  });

  const translateX = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [offsetX, 0]);
  });

  const width = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [MINI_WIDTH, WIDTH]);
  });

  const height = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [MINI_HEIGHT, 60]);
  });

  const paddingRight = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [5, 0]);
  });

  const style = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      paddingRight: paddingRight.value,
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.container}>
        <Artist value={track.artist} />
        <Title value={track.title} />
      </View>
    </Animated.View>
  );
};

const Artist: React.FC<{ value: string }> = ({ value }: { value: string }) => {
  const frame = useSharedValue(0);

  const { percent } = useAnimation();

  const onLayout = useCallback(({ nativeEvent: { layout } }) => {
    frame.value = layout.width;
  }, []);

  const translateX = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [0, (WIDTH - frame.value) / 2]);
  });

  const style = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  return (
    <Animated.View style={style}>
      <View>
        <Text
          size={15}
          color={Colors.light}
          numberOfLines={1}
          onLayout={onLayout}>
          {value}
        </Text>
      </View>
    </Animated.View>
  );
};

const Title: React.FC<{ value: string }> = ({ value }: { value: string }) => {
  const frame = useSharedValue(0);

  const { percent } = useAnimation();

  const onLayout = useCallback(({ nativeEvent: { layout } }) => {
    frame.value = layout.width;
  }, []);

  const translateX = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [0, (WIDTH - frame.value) / 2]);
  });

  const style = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  return (
    <Animated.View style={style}>
      <View>
        <Text
          size={17}
          color={Colors.blue}
          numberOfLines={1}
          onLayout={onLayout}>
          {value}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
