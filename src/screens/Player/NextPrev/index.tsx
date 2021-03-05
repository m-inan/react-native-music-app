import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Animated, {
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { ITrack } from 'src/interfaces';
import { usePlaylist, usePlayer } from 'src/provider';

import { useAnimation } from '../Context';

import { Item } from './Item';

interface Props {}

export const NextPrev: React.FC<Props> = () => {
  const { track } = usePlayer();
  const { active, lists, tracks } = usePlaylist();

  const { percent } = useAnimation();

  const [next, setNext] = useState<ITrack | null>(null);
  const [previous, setPrevious] = useState<ITrack | null>(null);

  const opacity = useDerivedValue(() => {
    return interpolate(percent.value, [90, 100], [0, 1]);
  });

  const style = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (track && lists && lists[active]) {
      const activeList = lists[active].items;
      const currentIndex = activeList.indexOf(track.id);

      if (currentIndex >= 0) {
        const previousIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;

        if (previousIndex >= 0) {
          const id = activeList[previousIndex];

          if (id) {
            setPrevious(tracks.find((item) => item.id == id) ?? null);
          }
        } else {
          setPrevious(null);
        }

        if (nextIndex >= 0 && nextIndex < activeList.length) {
          const id = activeList[nextIndex];

          if (id) {
            setNext(tracks.find((item) => item.id == id) ?? null);
          }
        } else {
          setNext(null);
        }
      }
    }
  }, [track, active, lists]);

  const onPressNext = () => {
    TrackPlayer.skipToNext();
  };

  const onPressPrevious = () => {
    TrackPlayer.skipToPrevious();
  };

  return (
    <Animated.View style={[styles.container, style]}>
      {next && <Item {...next} onPress={onPressNext} />}
      {previous && <Item {...previous} onPress={onPressPrevious} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
