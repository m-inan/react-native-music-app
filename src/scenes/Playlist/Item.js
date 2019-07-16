import React, { useState } from 'react'
import {
	View,
	Text,
	Image,
	Button,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native'
import { useDispatch } from 'react-redux'
import RNFS from 'react-native-fs'
import TrackPlayer from 'react-native-track-player'

import { setAudioFileExists } from '../../reducers/Playlist/actions'
import { setUserPlaying } from '../../reducers/Player/actions'
import { Colors, Api } from '../../constants'

export default function Item({
	thumbnail,
	title,
	videoId,
	exists,
	playlistId
}) {
	const toFile = `${RNFS.DocumentDirectoryPath}/${videoId}.mp3`
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)

	const _downloadAudio = async () => {
		setLoading(true)

		const response = await fetch(`${Api.BaseURI}/download/${videoId}`)
		const { audio: fromUrl } = await response.json()

		console.log(fromUrl)

		await RNFS.downloadFile({
			fromUrl,
			toFile
		})

		dispatch(setAudioFileExists(playlistId, videoId))
		setLoading(false)
	}

	const _play = async () => {
		await TrackPlayer.add({
			title,
			thumbnail,
			id: videoId,
			url: `file://${toFile}`,
			artist: 'Minan'
		})

		dispatch(setUserPlaying(true))
	}

	return (
		<View style={styles.item}>
			<Image source={{ uri: thumbnail }} style={styles.thumbnail} />
			<Text style={{ color: Colors.gray, flex: 1 }}>{title}</Text>
			{exists ? (
				<TouchableOpacity onPress={_play}>
					<Text style={styles.play}>Play</Text>
				</TouchableOpacity>
			) : loading ? (
				<View style={styles.spinner}>
					<ActivityIndicator />
				</View>
			) : (
				<Button title="download" onPress={_downloadAudio} />
			)}
		</View>
	)
}

const styles = {
	item: {
		height: 70,
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray,
		padding: 10,
		flexDirection: 'row'
	},
	thumbnail: {
		width: 60,
		height: 50,
		marginRight: 15
	},
	spinner: {
		paddingVertical: 20
	},
	play: {
		color: 'white',
		padding: 10,
		fontSize: 18
	}
}
