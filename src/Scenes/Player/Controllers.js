import React, { useContext, useMemo } from 'react'
import { Button, View } from 'react-native'
import TrackPlayer, { ProgressComponent } from 'react-native-track-player'

import { Context, setUserPlaying } from '../../Stores'


export default function Controller () {
  const { state: { Player }, dispatch } = useContext(Context)

  const playback = Player.state === 'playing'

  return <View style={styles.container}>
    <Button title="Prev" onPress={() => {
      TrackPlayer.skipToPrevious()
    }} />
    <Button title={Player.isPlaying ? 'Pause' : 'Play'} onPress={() => {
      dispatch(setUserPlaying(!Player.isPlaying))

      TrackPlayer[playback ? 'pause' : 'play']()
    }} />
    <Button title="Next" onPress={() => {
      TrackPlayer.skipToNext()
    }} />
  </View>
}


const styles = {
  container: {
    position: 'relative',
    top: 200,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    zIndex: 4,
    flexDirection: 'row',
  }
}
