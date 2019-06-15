import { Navigation } from 'react-native-navigation'
import withProvider from './withProvider'

import Auth from '../scenes/Auth'
import Playlist from '../scenes/Playlist'

import { getToken } from '../utils'

export default async function Navigator(store) {
	Navigation.registerComponent('Auth', () => withProvider(Auth, store))
	Navigation.registerComponent('Playlist', () => withProvider(Playlist, store))

	Navigation.setDefaultOptions({
		topBar: {
			visible: false
		},
		layout: {
			backgroundColor: 'rgb(52, 58, 64)',
			orientation: ['portrait']
		}
	})

	const token = await getToken()

	Navigation.setRoot({
		root: {
			stack: {
				children: [
					{
						component: {
							name: 'Playlist' //token ? 'Search' : 'Auth'
						}
					}
				]
			}
		}
	})
}
