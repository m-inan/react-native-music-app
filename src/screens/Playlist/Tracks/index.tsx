import React from 'react';
import { View, Animated, Dimensions, PanResponderInstance } from 'react-native';

import { IPlaylist, ITrack } from 'src/interfaces';
import { usePlaylist } from 'src/provider';

import { List } from './List';
import { CornerShadow } from './CornerShadow';
import { styles } from './styles';

const { width } = Dimensions.get('window');

interface Props {
  panResponder: PanResponderInstance;
  translateX: Animated.Value;
}

export const Tracks: React.FC<Props> = ({ panResponder, translateX }) => {
  const { lists, tracks } = usePlaylist();

  return (
    <View style={styles.area}>
      <CornerShadow />

      <Animated.View {...panResponder.panHandlers} style={styles.container}>
        <Animated.View
          style={[
            styles.wrapper,
            { width: width * lists.length, transform: [{ translateX }] },
          ]}>
          {lists.map((playlist: IPlaylist, key: number) => (
            <View key={key} style={{ width }}>
              <List
                playlist={key}
                // @ts-ignore
                items={playlist.items
                  .map((id: number) =>
                    tracks.find((track: ITrack) => track.id === String(id)),
                  )
                  .filter((track: ITrack | undefined) => track !== undefined)}
              />
            </View>
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};
