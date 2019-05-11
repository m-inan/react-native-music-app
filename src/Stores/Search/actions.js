import * as types from './types'


export function toggle () {
  return (dispatch, getState) => {
    const { show } = getState().Search

    dispatch({
      type: types.SHOW,
      payload: !show
    })
  }
}