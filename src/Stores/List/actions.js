import * as types from './types'

export const setList = items => {
  return {
    type: types.SET_LIST,
    payload: {
      items
    }
  }
}