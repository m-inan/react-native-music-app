import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { getPosition, getDuration } from 'react-native-track-player';
import Animated, {
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Colors } from 'src/constants';
import { Text } from 'src/components';
import { usePlayer } from 'src/provider';
import { timeFormat } from 'src/utils';

import { useAnimation } from '../Context';
import { SLIDER_HEIGHT } from '../Dimensions';

let timeout: any;

interface Props {
  time: number;
  isTouching: boolean;
}

export const Duration: React.FC<Props> = ({ time, isTouching }: Props) => {
  const { track } = usePlayer();

  const { percent } = useAnimation();

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    clearTimeout(timeout);
    setCurrentPosition();
  }, [track]);

  useEffect(() => {
    if (time) {
      setPosition(time);
    }
  }, [time]);

  useEffect(() => {
    clearTimeout(timeout);

    if (!isTouching) {
      timeout = setTimeout(setCurrentPosition, 1000);
    }
  }, [isTouching]);

  const setCurrentPosition = async () => {
    const p = await getPosition();
    const d = await getDuration();

    setPosition(p);
    setDuration(d);

    timeout = setTimeout(setCurrentPosition, 1000);
  };

  const opacity = useDerivedValue(() => {
    return interpolate(percent.value, [0, 80, 100], [0, 0, 1]);
  });

  const positionStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const durationStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Fragment>
      <Animated.View style={[styles.position, positionStyle]}>
        <Text color={Colors.light} numberOfLines={1}>
          {timeFormat(position)}
        </Text>
      </Animated.View>
      <Animated.View style={[styles.duration, durationStyle]}>
        <Text color={Colors.light} numberOfLines={1}>
          {timeFormat(duration)}
        </Text>
      </Animated.View>
    </Fragment>
  );
};

const bottom = SLIDER_HEIGHT - 10;

const styles = StyleSheet.create({
  position: {
    bottom,
    left: 0,
    width: 70,
    height: 25,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  duration: {
    bottom,
    right: 0,
    width: 70,
    height: 25,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
