import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { ITrack } from 'src/interfaces';
import { usePlaylist, usePlayer } from 'src/provider';
import { useBottomSheet } from '../Context';
import { Item } from './Item';

interface Props {}

export const NextPrevious: React.FC<Props> = () => {
  const { range } = useBottomSheet();

  const { track } = usePlayer();
  const { active, lists, tracks } = usePlaylist();

  const [next, setNext] = useState<ITrack | null>(null);
  const [previous, setPrevious] = useState<ITrack | null>(null);

  const opacity = range([90, 100], [0, 1]);

  useEffect(() => {
    if (track && lists && lists[active]) {
      const activeList = lists[active].items;
      const currentIndex = activeList.indexOf(Number(track.id));

      if (currentIndex >= 0) {
        const previousIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;

        if (previousIndex >= 0) {
          const id = activeList[previousIndex];

          if (id) {
            setPrevious(tracks.find((item) => Number(item.id) == id) ?? null);
          }
        } else {
          setPrevious(null);
        }

        if (nextIndex >= 0 && nextIndex < activeList.length) {
          const id = activeList[nextIndex];

          if (id) {
            setNext(tracks.find((item) => Number(item.id) == id) ?? null);
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
    <Animated.View style={[styles.container, { opacity }]}>
      {next && <Item {...next} onPress={onPressNext} />}
      {previous && <Item {...previous} onPress={onPressPrevious} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
