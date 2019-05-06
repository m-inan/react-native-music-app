import React, { useEffect } from 'react'
import { View } from 'react-native'
import TrackPlayer from 'react-native-track-player'


export default function List () {
	async function loadmusics () {
		await TrackPlayer.setupPlayer()

		await Promise.all([
			{
				id: 1,
				title: 'Love Me', 
				artist: 'Ellie Goulding' ,
				url: 'http://localhost:8080/Loveme.mp3',
				thumbnail: 'http://localhost:8080/Loveme.png'
			},
			{ 
				id: 2, 
				title: 'Burn', 
				artist: 'Ellie Goulding',
				url: 'http://localhost:8080/Burn.mp3',
				thumbnail: 'http://localhost:8080/Burn.jpg'
			}
		].map(async item => [
			await TrackPlayer.add({ ...item })
		]))
	}


	useEffect(() => {
		loadmusics()
	}, [])

	return <View style={styles.container} />
}


const styles = {
	container: {
		flex: 1,
		backgroundColor: 'rgb(49, 55, 57)'
	}
}