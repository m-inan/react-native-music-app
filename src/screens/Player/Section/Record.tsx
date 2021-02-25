import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  getState,
  STATE_PAUSED,
  STATE_PLAYING,
  STATE_STOPPED,
  TrackPlayerEvents,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Animated, {
  Easing,
  withTiming,
  withRepeat,
  interpolate,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  cancelAnimation,
} from 'react-native-reanimated';

import { Colors } from 'src/constants';
import { usePlayer } from 'src/provider';

import { useAnimation } from '../Context';
import { WIDTH, MINI_HEIGHT, SECTION_HEIGHT } from '../Dimensions';

const size = SECTION_HEIGHT - 70;

const { PLAYBACK_STATE, PLAYBACK_TRACK_CHANGED } = TrackPlayerEvents;

interface Props {
  offsetY: Animated.SharedValue<number>;
}

export const Record: React.FC<Props> = ({ offsetY }: Props) => {
  const { percent } = useAnimation();

  const spin = useSharedValue(1);

  const animation = () => {
    cancelAnimation(spin);

    spin.value = withRepeat(
      withTiming(spin.value - 1, { easing: Easing.linear, duration: 2000 }),
      -1,
      false,
    );
  };

  useTrackPlayerEvents(
    [PLAYBACK_STATE, PLAYBACK_TRACK_CHANGED],
    async (event: any) => {
      if (event.type === PLAYBACK_STATE) {
        if (event.state === STATE_PLAYING) {
          animation();
        } else if (event.state === STATE_PAUSED) {
          cancelAnimation(spin);
        } else if (event.state === STATE_STOPPED) {
          spin.value = 0;
          cancelAnimation(spin);
        }
      } else if (event.type === PLAYBACK_TRACK_CHANGED) {
        spin.value = 0;

        const state = await getState();

        if (state === STATE_PLAYING) {
          animation();
        }
      }
    },
  );

  const translateY = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [offsetY.value * -1, 0]);
  });

  const width = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [MINI_HEIGHT, WIDTH]);
  });

  const radius = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [MINI_HEIGHT, size]);
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: radius.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const padding = useDerivedValue(() => {
    return interpolate(percent.value, [0, 100], [10, 0]);
  });

  const rotate = useDerivedValue(() => {
    const deg = interpolate(spin.value, [1, 0], [0, 360]);

    return `${deg}deg`;
  });

  const wrapperStyle = useAnimatedStyle(() => {
    return {
      width: radius.value,
      height: radius.value,
      padding: padding.value,
      transform: [{ rotateZ: rotate.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.wrapper, wrapperStyle]}>
        <Circle />
      </Animated.View>
    </Animated.View>
  );
};

const Circle = () => {
  const { track } = usePlayer();
  const { percent } = useAnimation();

  const style = useAnimatedStyle(() => {
    return {
      padding: interpolate(percent.value, [0, 100], [5, 15]),
    };
  });

  const circleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(percent.value, [0, 100], [0, 1]),
    };
  });

  return (
    <Animated.View style={[styles.cover, style]}>
      <View style={styles.artwork}>
        {track.artwork ? (
          <FastImage source={track.artwork} style={styles.image} />
        ) : null}
      </View>
      <View style={styles.dotCover}>
        <View style={styles.dot} />
      </View>
      <Animated.View style={[styles.circleCover, circleStyle]}>
        <View style={styles.circle} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    position: 'absolute',
    alignItems: 'center',
  },

  wrapper: {},

  cover: {
    width: '100%',
    height: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    backgroundColor: Colors.black,
  },

  circleCover: {
    padding: 5,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    borderColor: Colors.primary,
    borderWidth: 1,
  },

  artwork: {
    borderRadius: 999,
    width: '100%',
    overflow: 'hidden',
    height: '100%',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  dotCover: {
    width: '20%',
    height: '20%',
    borderRadius: 999,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },

  dot: {
    width: '70%',
    height: '70%',
    borderRadius: 999,
    backgroundColor: Colors.black,
  },
});
