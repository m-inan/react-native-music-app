import * as types from './types'

export const setList = items => {
  return {
    type: types.SET,
    payload: {
      items
    }
  }
}
