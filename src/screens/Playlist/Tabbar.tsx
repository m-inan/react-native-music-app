import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { IPlaylist } from 'src/interfaces';
import { Colors } from 'src/constants';
import { Text, TextType } from 'src/components';
import { usePlaylist } from 'src/provider';

export const Tabbar = () => {
  const { lists, swipeIndex, setSwipeIndex } = usePlaylist();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {lists.map((playlist: IPlaylist, key: number) => (
          <TouchableOpacity key={key} onPress={() => setSwipeIndex(key)}>
            <View style={styles.text}>
              <Text
                size={18}
                type={
                  swipeIndex === key ? TextType.SEMIBOLD : TextType.REGULAR
                }>
                {playlist.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingLeft: 25,
    alignItems: 'flex-start',
    backgroundColor: Colors.primary,
  },
  text: {
    paddingRight: 25,
    paddingVertical: 20,
  },
});
