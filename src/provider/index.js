import React from 'react'
import { AppState } from 'react-native'
import { Provider } from 'react-redux'
import TrackPlayer from 'react-native-track-player'

import Navigation from './navigation'
import store from './store'

import { updatePlayback, initializePlayback } from '../reducers/Player/actions'
import Handler from '../reducers/Player/handler'
import Player from '../scenes/Player'
import Logo from '../components/Header/logo'

export default function withProvider() {
	store.dispatch(initializePlayback())

	AppState.addEventListener('change', appState => {
		if (appState == 'active') {
			store.dispatch(updatePlayback())
		}
	})

	TrackPlayer.registerEventHandler(Handler(store.dispatch))

	return (
		<Provider store={store}>
			<Logo />
			<Navigation />
			<Player />
		</Provider>
	)
}
