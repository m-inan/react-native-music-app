import * as types from './types'
import initialState from '../initialState'

export default function reducer (state = initialState.Player, { type, payload }) {
  switch( type ) {
    case types.PLAYBACK_INIT:
      return {
        ...state,
        init: true
      }
    case types.PLAYBACK_STATE:
      return {
        ...state,
        state: payload.state
      }
    case types.PLAYBACK_TRACK:
      return {
        ...state,
        time: 0,
        track: payload.track,
        duration: payload.duration
      }
    case types.PLAYBACK_TIME:
      return {
        ...state,
        time: payload.time
      }
    case types.PLAYING:
      return {
        ...state,
        playing: payload.playing
      }
    case types.SHUFFLE:
      return {
        ...state,
        shuffle: payload.shuffle
      }
    case types.REPLAY:
      return {
        ...state,
        replay: payload.replay
      }
    default: return state;
  }
}