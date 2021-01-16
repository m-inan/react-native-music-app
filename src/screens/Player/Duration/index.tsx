import React, { Fragment, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { Colors } from 'src/constants';
import { Text } from 'src/components';
import { timeFormat } from 'src/utils';

import { useBottomSheet } from '../Context';

interface Props {
  percent: Animated.AnimatedValue;
  touching: boolean;
}

let timeout: any;

export const Duration: React.FC<Props> = ({ percent, touching }: Props) => {
  const { range } = useBottomSheet();
  const opacity = range([80, 100], [0, 1]);

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    clearTimeout(timeout);

    if (!touching) {
      timeout = setTimeout(setCurrentPosition, 1000);
    }
  }, [touching]);

  useEffect(() => {
    let id = '';

    if (touching && duration) {
      id = percent.addListener(({ value }: { value: number }) => {
        setPosition((duration / 100) * value);
      });
    }

    return () => percent.removeListener(id);
  }, [touching, duration]);

  useEffect(() => {
    if (!touching) {
      setPosition(position);
    }
  }, [touching, position]);

  const setCurrentPosition = async () => {
    const p = await TrackPlayer.getPosition();
    const d = await TrackPlayer.getDuration();

    setPosition(p);
    setDuration(d);

    timeout = setTimeout(setCurrentPosition, 1000);
  };

  return (
    <Fragment>
      <Animated.View style={[styles.time, { opacity }]}>
        <Text color={Colors.light}>{timeFormat(position)}</Text>
      </Animated.View>
      <Animated.View style={[styles.duration, { opacity }]}>
        <Text color={Colors.light}>{timeFormat(duration)}</Text>
      </Animated.View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  time: {
    top: '40%',
    width: 50,
    height: 20,
    left: 10,
    marginTop: -20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  duration: {
    top: '40%',
    width: 50,
    height: 20,
    right: 10,
    marginTop: -20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
