import React from 'react'
import { View } from 'react-native'

import Player from './Scenes/Player'
import List from './Scenes/List'

import { Provider } from './Stores'

export default function App () {
	return (
		<View style={{ flex: 1 }}>
			<Provider>
				<List />
				<Player />

			</Provider>
		</View>
	)
}