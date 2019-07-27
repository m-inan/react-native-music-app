import React from 'react'
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

import {
	setAudioFileExists,
	setFileLoading
} from '../../reducers/Playlist/actions'
import { setUserPlaying, playerReset } from '../../reducers/Player/actions'
import { Colors, Api } from '../../constants'

import { Download, Play } from '../../components/Icons'

export default function Item({
	artwork,
	title,
	videoId,
	exists,
	playlistId,
	loading
}) {
	const dispatch = useDispatch()
	const { id, items } = useSelector(state => state.Playlist)

	const toFile = `${RNFS.DocumentDirectoryPath}/${videoId}.mp3`

	const _downloadAudio = async () => {
		dispatch(setFileLoading(videoId, true))

		const response = await fetch(`${Api.BaseURI}/download/${videoId}`)
		const { audio: fromUrl } = await response.json()

		await RNFS.downloadFile({
			fromUrl,
			toFile
		})

		dispatch(setFileLoading(videoId, true))
		dispatch(setAudioFileExists(playlistId, videoId))
	}

	const _play = async () => {
		if (playlistId !== id) {
			await TrackPlayer.reset()

			dispatch(playerReset())

			const addList = items
				.find(item => item.id === playlistId)
				.list.filter(item => item.exists)
				.map(({ title, artwork, videoId, source }) => ({
					title,
					artwork,
					id: videoId,
					url: source,
					artist: 'Minan'
				}))

			await TrackPlayer.add(addList)
		}

		await TrackPlayer.skip(videoId)
		dispatch(setUserPlaying(true))
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
