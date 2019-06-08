import * as types from './types'
import initialState from './initialState'

export default function reducer(state = initialState(), { type, payload }) {
  switch (type) {
    case types.INIT:
      return {
        ...state,
        init: true
      }
    case types.STATE:
      return {
        ...state,
        state: payload.state
      }
    case types.TRACK:
      return {
        ...state,
        time: 0,
        track: payload.track,
        duration: payload.duration
      }
    case types.TIME:
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
    default:
      return state
  }
}
