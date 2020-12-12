import React from 'react';
import { View, Animated, Dimensions, PanResponderInstance } from 'react-native';

import { IPlaylist, ITrack } from 'src/interfaces';

import { List } from './List';
import { BorderTopLeftShadow } from './BorderTopLeftShadow';
import { styles } from './styles';

const { width } = Dimensions.get('window');

interface Props {
  playlists: IPlaylist[];
  items: ITrack[];
  panResponder: PanResponderInstance;
  translateX: Animated.Value;
}

export const Tracks: React.FC<Props> = ({
  panResponder,
  translateX,
  playlists,
  items,
}) => {
  return (
    <View style={styles.area}>
      <BorderTopLeftShadow />

      <Animated.View {...panResponder.panHandlers} style={styles.container}>
        <Animated.View
          style={[
            styles.wrapper,
            { width: width * playlists.length, transform: [{ translateX }] },
          ]}>
          {playlists.map((playlist: IPlaylist, key: number) => (
            <View key={key} style={{ width }}>
              <List
                // @ts-ignore
                items={playlist.items
                  .map((id: number) =>
                    items.find((item: ITrack) => item.id == id),
                  )
                  .filter((item: ITrack | undefined) => item !== undefined)}
              />
            </View>
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};
