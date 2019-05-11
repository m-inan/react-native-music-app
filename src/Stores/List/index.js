import * as types from './types'
import initialState from '../initialState'


export * from './actions'


export default function reducer (state = initialState.List, { type, payload }) {
  switch(type) {
    case types.SET:
      return payload.items

    default: return state
  }
}