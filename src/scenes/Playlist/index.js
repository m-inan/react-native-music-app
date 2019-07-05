import React from 'react'
import { View } from 'react-native'
import Player from '../Player'

import Header from '../../components/Header'
import Logo from '../../components/Header/logo'

import Lists from './Lists'

export default function Playlist() {
	return (
		<View style={{ flex: 1 }}>
			<Header />
			<Logo />
			<Lists />
			<Player />
		</View>
	)
}