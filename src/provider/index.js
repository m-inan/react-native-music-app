import { AppState } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import store from './store'
import Navigation from './navigation'

import { updatePlayback, initializePlayback } from '../reducers/Player/actions'
import Handler from '../reducers/Player/handler'

export default function Provider() {
	store.dispatch(initializePlayback())

	AppState.addEventListener('change', appState => {
		if (appState == 'active') {
			store.dispatch(updatePlayback())
		}
	})

	TrackPlayer.registerEventHandler(Handler(store.dispatch))

	Navigation(store)
}
