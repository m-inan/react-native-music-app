import React from 'react';
import { View, Dimensions } from 'react-native';
import { Music } from '../Icons';


const { width } = Dimensions.get('window')

export function Logo () {
  return (
    <View style={styles.container} pointerEvents="none">
      <Music />
    </View>
  )
}

const styles = {
  container: {
    width: 30,
    height: 30,
    position: 'absolute',
    width: '100%',
    top: 25,
    alignItems: 'center',
    zIndex: 5
  }
}