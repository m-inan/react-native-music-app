import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { Colors } from 'src/constants';

import { List } from './List';

interface Props {}

export const Tabbar: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <List />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    alignItems: 'flex-start',
    backgroundColor: Colors.primary,
  },
  scrollView: {
    paddingVertical: 25,
  },
  content: {
    paddingLeft: 25,
    flexDirection: 'row',
  },
});
