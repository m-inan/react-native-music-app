import React from 'react'
import {
	View,
	Text,
	Image,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native'
import { useDispatch } from 'react-redux'

import { downloadAudio, itemPlay } from '../../reducers/Player/actions'
import { Colors } from '../../constants'

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

	const _downloadAudio = () => {
		dispatch(downloadAudio(videoId, playlistId))
	}

	const _play = async () => {
		dispatch(itemPlay(videoId, playlistId))
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
