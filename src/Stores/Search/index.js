import * as types from './types'
import initialState from '../initialState'


export default function reducer (state = initialState.Search, { type, payload }) {
  switch( type ) {
    case types.SHOW:
      return {
       ...state,
       show: payload
      }

    default: return state
  }
}