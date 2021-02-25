import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import {
  seekTo,
  getPosition,
  getDuration,
  STATE_PLAYING,
  TrackPlayerEvents,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Animated, {
  Easing,
  runOnJS,
  interpolate,
  Extrapolate,
  withTiming,
  cancelAnimation,
  useSharedValue,
  useDerivedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

import { atan2 } from 'src/utils';
import { Colors } from 'src/constants';

import { useAnimation } from '../Context';
import { WIDTH, SLIDER_HEIGHT } from '../Dimensions';
import {
  d,
  cx,
  cy,
  PI,
  width,
  circle,
  padding,
  centerX,
  viewBox,
  strokeDasharray,
} from './Dimensions';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const {
  PLAYBACK_ERROR,
  PLAYBACK_STATE,
  PLAYBACK_TRACK_CHANGED,
} = TrackPlayerEvents;

const events = [PLAYBACK_STATE, PLAYBACK_ERROR, PLAYBACK_TRACK_CHANGED];

let timeout: any;

interface Props {
  isTouching: boolean;

  setTime: (value: number) => void;
  setTouching: (value: boolean) => void;
}

export const Slider: React.FC<Props> = ({
  isTouching,

  setTime,
  setTouching,
}: Props) => {
  const { percent: position } = useAnimation();

  const percent = useSharedValue(0);
  const instant = useSharedValue(0);

  const [playbackState, setPlaybackState] = useState(null);

  const setTimePosition = async (value: number, audio: boolean = false) => {
    const duration = await getDuration();

    if (duration) {
      const time = (duration / 100) * value;
      setTime(time);
      if (audio) {
        await seekTo(time);
      }
    }

    setTouching(false);
  };

  useTrackPlayerEvents(events, async (event: any) => {
    if (event.type === PLAYBACK_TRACK_CHANGED) {
      if (event.nextTrack) {
        percent.value = withTiming(0, {
          duration: 500,
        });
      }
    } else if (event.type === PLAYBACK_STATE) {
      setPlaybackState(event.state);
    }
  });

  useEffect(() => {
    clearTimeout(timeout);
    const isPlaying = playbackState === STATE_PLAYING;

    if (!isTouching && isPlaying) {
      timeout = setTimeout(setCurrentPosition, 1000);
    }
  }, [isTouching, playbackState]);

  const setCurrentPosition = async () => {
    const p = await getPosition();
    const d = await getDuration();

    if (p >= 0 && d) {
      const value = (p * 100) / d;

      percent.value = withTiming(value, {
        duration: 1000,
        easing: Easing.linear,
      });
    }

    timeout = setTimeout(setCurrentPosition, 1000);
  };

  const tapGestureHandler = useAnimatedGestureHandler({
    onStart: (event: any) => {
      runOnJS(setTouching)(true);

      const value = interpolate(
        atan2(event.y, event.x - centerX),
        [PI, 0],
        [0, 100],
      );

      instant.value = value;
      percent.value = withTiming(value);
    },
    onEnd: () => {
      runOnJS(setTimePosition)(instant.value, true);
    },
  });

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (event: any) => {
      runOnJS(setTouching)(true);

      const value = interpolate(
        atan2(event.y, event.x - centerX),
        [PI, 0],
        [0, 100],
      );

      percent.value = withTiming(value);
    },

    onActive: (event) => {
      cancelAnimation(percent);

      let value = 0;

      if (event.y < 0) {
        if (event.x < centerX) {
          value = 0;
        } else {
          value = 100;
        }
      } else {
        value = interpolate(
          atan2(event.y, event.x - centerX),
          [PI, 0],
          [0, 100],
        );
      }

      percent.value = value;
      runOnJS(setTimePosition)(value);
    },
    onEnd: () => {
      runOnJS(setTimePosition)(percent.value, true);
    },
  });

  const tetha = useDerivedValue(() => {
    const positionValue = interpolate(
      position.value,
      [0, 50, 100],
      [0, 0, 100],
    );
    const value = percent.value - 100 + positionValue;

    return interpolate(value, [0, 100], [PI, 0], Extrapolate.CLAMP);
  });

  const x = useDerivedValue(() => {
    const radius = width / 2 - padding;

    return cx + radius * Math.cos(tetha.value);
  });

  const y = useDerivedValue(() => {
    const radius = width / 2 - padding;

    return cy + radius * Math.sin(tetha.value);
  });

  const strokeDashoffset = useDerivedValue(() => {
    return interpolate(
      tetha.value,
      [PI, 0],
      [strokeDasharray, 0],
      Extrapolate.CLAMP,
    );
  });

  const pathProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: strokeDashoffset.value,
    };
  });

  const shadowPathProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: strokeDashoffset.value,
    };
  });

  const circleProps = useAnimatedProps(() => {
    return {
      cx: x.value,
      cy: y.value,
    };
  });

  const circleShadowProps = useAnimatedProps(() => {
    return {
      cx: x.value,
      cy: y.value,
    };
  });

  const opacity = useDerivedValue(() => {
    return interpolate(position.value, [0, 80, 100], [0, 0, 1]);
  });

  const translateY = useDerivedValue(() => {
    return interpolate(position.value, [0, 100], [200, 0]);
  });

  const style = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      {/* @ts-ignore */}
      <TapGestureHandler onGestureEvent={tapGestureHandler}>
        <Animated.View>
          <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View>
              <Svg viewBox={viewBox} style={styles.svg}>
                <Path d={d} fill="none" stroke={Colors.mute} strokeWidth={2} />

                <AnimatedPath
                  d={d}
                  fill="none"
                  stroke="rgba(227, 42, 118, .5)"
                  strokeWidth={3}
                  strokeDasharray={strokeDasharray}
                  animatedProps={shadowPathProps}
                />

                <AnimatedPath
                  d={d}
                  fill="none"
                  stroke={Colors.primary}
                  strokeWidth={2}
                  strokeDasharray={strokeDasharray}
                  animatedProps={pathProps}
                />

                <AnimatedCircle
                  r={circle}
                  fill={Colors.primary}
                  animatedProps={circleShadowProps}
                />

                <AnimatedCircle
                  r={circle + 1}
                  fill={'rgba(227, 42, 118, .3)'}
                  animatedProps={circleProps}
                />
              </Svg>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: SLIDER_HEIGHT,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
});
