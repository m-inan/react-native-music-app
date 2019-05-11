import React, { useEffect } from 'react'
import { View } from 'react-native'
import TrackPlayer from 'react-native-track-player'


export default function List () {
	async function loadmusics () {


	}


	useEffect(() => {
		loadmusics()
	}, [])

	return <View style={styles.container} />
}


const styles = {
	container: {
		flex: 1
	}
}