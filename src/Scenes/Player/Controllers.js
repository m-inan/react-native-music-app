import React, { useContext } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import { Context, setUserPlaying } from '../../Stores'

import { Play, Pause, Skip, Replay, Shuffle } from '../../Icons'


export default function Controller () {
  const { state: { Player: { isPlaying } }, dispatch } = useContext(Context)



  const onClickPlayPause = () => {
    dispatch(setUserPlaying(!isPlaying))

    TrackPlayer[isPlaying ? 'pause' : 'play']()
  }



  return <View style={styles.container}>
    <View style={styles.shuffle}>
      <Shuffle fill={'rgb(225, 47, 129)'} />
    </View>

    <View style={styles.replay}>
      <Replay fill={'rgb(225, 47, 129)'} />
    </View>

    <View style={styles.prev}>
      <Skip />
    </View>

    <TouchableWithoutFeedback onPress={onClickPlayPause}>
      <View style={styles.playPause}>
        { isPlaying ? <Pause /> : <Play /> }
      </View>
    </TouchableWithoutFeedback>

    <View style={styles.next}>
      <Skip />
    </View>
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
  },

  playPause: {
    width: 30,
    marginHorizontal: 40
  },
  
  prev: {
    width: 20,
    transform: [
      { rotate: '-180deg' }
    ]
  },

  next: {
    width: 20
  },

  shuffle: {
    position: 'absolute',
    top: 0,
    left: 30,
    width: 25,
    height: 25,
  },

  replay: {
    position: 'absolute',
    top: 0,
    right: 30,
    width: 25,
    height: 25,
  }
}
