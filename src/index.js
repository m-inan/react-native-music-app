import React from 'react'
import { View } from 'react-native'

import { Header, Logo } from './Components'

import Player from './Scenes/Player'
import List from './Scenes/List'

import { Provider } from './Stores'


export default function App () {
	return (
		<View style={{ flex: 1, backgroundColor: 'rgb(49, 55, 57)' }}>
			<Provider>
				<Logo />
				<Header />
				<List />
				<Player />
			</Provider>
		</View>
	)
}