import React from 'react'
import { AppState } from 'react-native'
import { Provider } from 'react-redux'
import TrackPlayer from 'react-native-track-player'

import store from './store'
import Playlist from 'screens/Playlist'

import { updatePlayback, initializePlayback } from 'reducers/Player/actions'

import Service from './service'

export default function withProvider() {
	store.dispatch(initializePlayback())

	AppState.addEventListener('change', appState => {
		if (appState == 'active') {
			store.dispatch(updatePlayback())
		}
	})

	TrackPlayer.registerPlaybackService(() => Service(store.dispatch))

	return (
		<Provider store={store}>
			<Playlist />
		</Provider>
	)
}
