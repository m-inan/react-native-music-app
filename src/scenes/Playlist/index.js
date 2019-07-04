import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button } from 'react-native'
import Player from '../Player'
import RNFS from 'react-native-fs'
import TrackPlayer from 'react-native-track-player'
import { setUserPlaying } from '../../reducers/Player/actions'

import Header from '../../components/Header'
import Logo from '../../components/Header/logo'

import Lists from './Lists'

function Playlist({ dispatch }) {
	const [check, setCheck] = useState(false)
	const [exist, setExist] = useState(false)

	useEffect(() => {
		RNFS.exists(`${RNFS.DocumentDirectoryPath}/zzfdbn53krg.mp3`).then(
			fileExist => {
				setExist(fileExist)
				setCheck(true)
			}
		)
	}, [])

	const download = async () => {
		console.log(RNFS.DocumentDirectoryPath)
		await RNFS.downloadFile({
			fromUrl: 'http://localhost:8080/zzfdbn53krg.mp3',
			toFile: `${RNFS.DocumentDirectoryPath}/zzfdbn53krg.mp3`
		})

		setExist(true)

		console.log('finish')
	}

	const play = async () => {
		console.log(`${RNFS.DocumentDirectoryPath}/zzfdbn53krg.mp3`)
		await TrackPlayer.add({
			id: 'zzfdbn53krg',
			url: `file://${RNFS.DocumentDirectoryPath}/zzfdbn53krg.mp3`,
			title: 'Track Title',
			artist: 'Track Artist',
			thumbnail:
				'http://tritonalmusic.com/wp-content/uploads/2018/11/Tritonal_U-and-Me_Album.jpg'
		})

		// Starts playing it
		dispatch(setUserPlaying(true))
	}

	if (!check) {
		return <View />
	}

	return (
		<View style={{ flex: 1 }}>
			<Header />
			<Logo />
			<Lists />
			<Player />
		</View>
	)
}

export default connect(state => state)(Playlist)
