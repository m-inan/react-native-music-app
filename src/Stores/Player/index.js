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
        track: payload.track,
        duration: payload.duration
      }
    case types.PLAYBACK_TIME:
      return {
        ...state,
        time: payload.time
      }
    case types.ISPLAYING:
      return {
        ...state,
        isPlaying: payload.isPlaying
      }
    default: return state;
  }
}