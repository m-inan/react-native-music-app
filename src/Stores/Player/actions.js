import TrackPlayer from 'react-native-track-player';
import * as types from './types'

export function initializePlayback() {
  return async dispatch => {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 5 // 5 mb
    })

    dispatch({ type: types.INIT })
  }
}

export function playbackState(state) {
  return {
    type: types.STATE,
    payload: {
      state
    }
  }
}

export function playbackTrack(track) {
  return async dispatch => {
    const duration = await TrackPlayer.getDuration()
    track = await TrackPlayer.getTrack(track)
  
    dispatch({
      type: types.TRACK,
      payload: {
        track,
        duration
      }
    })
  }
}

export function updatePlayback() {
  return async dispatch => {
    try {
      dispatch(
        playbackState(
          await TrackPlayer.getState()
        )
      )

      dispatch(
        playbackTrack(
          await TrackPlayer.getCurrentTrack()
        )
      )
    } catch(e) {

    }
  }
}

export function updateTime(time) {
  return async dispatch => {
    dispatch({
      type: types.TIME,
      payload: {
        time
      }
    })
  }
}

export function setUserPlaying(playing) {
  return {
    type: types.PLAYING,
    payload: {
      playing
    }
  }
}

export function setShuffle(shuffle) {
  return {
    type: types.SHUFFLE,
    payload: {
      shuffle
    }
  }
}

export function setReplay(replay) {
  return {
    type: types.REPLAY,
    payload: {
      replay
    }
  }
}