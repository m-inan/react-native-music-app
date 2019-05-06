import React, { createContext, useReducer, useEffect } from 'react'
import { AppState } from 'react-native'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import TrackPlayer from 'react-native-track-player'
import Handler from './Player/handler'

import List from './List'
import Player from './Player'

import initialState from './initialState'

export * from './List/actions'
export * from './Player/actions'

import { updateTime, updatePlayback } from './Player/actions'

export const Context = createContext(initialState);

const rootReducer = combineReducers({
  List,
  Player
})

function applyMiddleware(...middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  return (state, dispatch) => {
    const store = {
      getState: () => state,
      dispatch
    }
    
    middlewares.forEach(middleware => (dispatch = middleware(store)(dispatch)));

    return dispatch;
  }
}

const enhanceDispatch = applyMiddleware(thunk);

export function Provider ({ children }) {
  const [state, PureDispatch] = useReducer(rootReducer, initialState);
  const dispatch = enhanceDispatch(state, PureDispatch)


  async function handleChange(appState) {
    if(appState == 'active') {
      dispatch(updatePlayback());
    }
  }

  useEffect(() => {
    AppState.addEventListener('change', handleChange);
    TrackPlayer.registerEventHandler(Handler(dispatch));
    TrackPlayer.setupPlayer({})

    TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
      ]
    })

    return () => {
      AppState.removeEventListener('change', handleChange);
    }
  }, [])


  useEffect(() => {
    let interval

    if ( state.Player.state === 'playing' ) {
      interval = setInterval(async () => {
        const position = await TrackPlayer.getPosition()
        dispatch(updateTime(position))
      }, 500)
    }

    return () => {
      clearInterval(interval)
    }
  }, [state.Player.state])
  

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}