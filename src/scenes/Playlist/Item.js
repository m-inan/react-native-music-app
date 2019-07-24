import React, { useState } from 'react'
import {
	View,
	Text,
	Image,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import RNFS from 'react-native-fs'
import TrackPlayer from 'react-native-track-player'

import { setAudioFileExists } from '../../reducers/Playlist/actions'
import { setUserPlaying } from '../../reducers/Player/actions'
import { Colors, Api } from '../../constants'

import { Download, Play } from '../../components/Icons'

export default function Item({ artwork, title, videoId, exists, playlistId }) {
	const dispatch = useDispatch()
	const { track } = useSelector(state => state.Player)
	const [loading, setLoading] = useState(false)

	const toFile = `${RNFS.DocumentDirectoryPath}/${videoId}.mp3`

	const _downloadAudio = async () => {
		setLoading(true)

		const response = await fetch(`${Api.BaseURI}/download/${videoId}`)
		const { audio: fromUrl } = await response.json()

		await RNFS.downloadFile({
			fromUrl,
			toFile
		})

		setLoading(false)
		dispatch(setAudioFileExists(playlistId, videoId, `file:/${toFile}`))
	}

	const _play = async () => {
		if (track) {
			await TrackPlayer.skip(videoId)
			dispatch(setUserPlaying(true))
		}
	}

	return (
		<View style={styles.item}>
			<Image source={{ uri: artwork }} style={styles.artwork} />
			<Text style={{ color: Colors.gray, flex: 1 }}>{title}</Text>
			{exists ? (
				<TouchableOpacity onPress={_play}>
					<View style={styles.play}>
						<Play />
					</View>
				</TouchableOpacity>
			) : loading ? (
				<View style={styles.spinner}>
					<ActivityIndicator />
				</View>
			) : (
				<TouchableOpacity onPress={_downloadAudio}>
					<View style={styles.download}>
						<Download />
					</View>
				</TouchableOpacity>
			)}
		</View>
	)
}

const styles = {
	item: {
		height: 70,
		borderBottomWidth: 0.5,
		borderBottomColor: Colors.gray,
		padding: 10,
		flexDirection: 'row'
	},
	artwork: {
		width: 60,
		height: 50,
		marginRight: 15
	},
	spinner: {
		paddingVertical: 20
	},
	download: {
		width: 50,
		height: 50,
		padding: 5,
		paddingLeft: 20
	},
	play: {
		width: 50,
		height: 50,
		padding: 5,
		paddingLeft: 20
	}
}
