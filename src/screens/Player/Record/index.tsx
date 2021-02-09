import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  findNodeHandle,
  Image,
  Easing,
} from 'react-native';
import {
  getState,
  useTrackPlayerEvents,
  STATE_PLAYING,
  STATE_PAUSED,
  STATE_STOPPED,
  TrackPlayerEvents,
} from 'react-native-track-player';

import { Dimensions, Colors } from 'src/constants';
import { usePlayer } from 'src/provider';
import { useAnimatedValue } from 'src/utils';

import { sliderRatio, minDeviceRatio } from '../Slider/Dimensions';
import { useBottomSheet } from '../Context';

interface Props {}

const { width } = Dimensions;

const dimension = width / sliderRatio - 60;
const radius = dimension / 2;

const { PLAYBACK_STATE, PLAYBACK_TRACK_CHANGED } = TrackPlayerEvents;

export const Record: React.FC<Props> = () => {
  const { track } = usePlayer();

  const marker = useRef<View>();

  const [measureY, setMeasureY] = useState(0);
  const { range, container } = useBottomSheet();

  const spinValue = useAnimatedValue(0);

  const size = range([70, dimension]);
  const opacity = range([0, 0, 1]);
  const padding = range([0, 10]);
  const translateY = range([-measureY, 0]);
  const translateX = range([-(radius + (minDeviceRatio ? 30 : 15)), 0]);

  useEffect(() => {
    if (typeof container?.current !== null) {
      marker.current?.measureLayout(
        // @ts-ignore
        findNodeHandle(container?.current ?? 0),
        (...measure) => {
          setMeasureY(measure[1] - 15);
        },
        () => {},
      );
    }
  }, [marker]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useTrackPlayerEvents(
    [PLAYBACK_STATE, PLAYBACK_TRACK_CHANGED],
    async (event: any) => {
      if (event.type === PLAYBACK_STATE) {
        if (event.state === STATE_PLAYING) {
          spinValue.extractOffset();
          runAnimation();
        } else if (event.state === STATE_PAUSED) {
          spinValue.stopAnimation();
          spinValue.extractOffset();
        } else if (event.state === STATE_STOPPED) {
          spinValue.flattenOffset();
          spinValue.setValue(0);
        }
      } else if (event.type === PLAYBACK_TRACK_CHANGED) {
        spinValue.flattenOffset();
        spinValue.setValue(0);

        const state = await getState();

        if (state === STATE_PLAYING) {
          runAnimation();
        }
      }
    },
  );

  const runAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  return (
    <Animated.View
      ref={marker}
      style={[
        styles.container,
        {
          padding,
          width: size,
          height: size,
          transform: [{ translateX }, { translateY }],
        },
      ]}
      pointerEvents="none">
      <Animated.View style={[styles.record, { transform: [{ rotate }] }]}>
        {track.artwork ? (
          <Image source={track.artwork} style={styles.image} />
        ) : null}

        <Animated.View style={[styles.cover, { opacity }]}>
          <View style={styles.circle} />
        </Animated.View>

        <View style={styles.dotCover}>
          <View style={styles.dot} />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    padding: 15,
    borderRadius: 999,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  record: {
    padding: 5,
    width: '100%',
    height: '100%',
    borderRadius: 999,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },

  cover: {
    width: '100%',
    height: '100%',
    padding: 7,
    position: 'absolute',
  },
  circle: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 999,
    borderColor: Colors.primary,
  },
  dotCover: {
    width: '22%',
    height: '22%',
    borderRadius: 999,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  dot: {
    width: '65%',
    height: '65%',
    borderRadius: 999,
    backgroundColor: Colors.black,
  },
});
