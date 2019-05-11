import React from 'react'
import { View } from 'react-native'

import { Header, Logo } from './Components'

import Player from './Scenes/Player'
import List from './Scenes/List'
import Search from './Scenes/Search'

import { Provider } from './Stores'


export default function App () {
	return (
		<View style={styles.container}>
			<Provider>
				<Logo />
				<Header />
				<List />
				<Player />
				<Search />
			</Provider>
		</View>
	)
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: 'rgb(49, 55, 57)'
	}
}