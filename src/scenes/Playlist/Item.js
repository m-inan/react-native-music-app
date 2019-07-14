import React, { useState } from 'react'
import { View, Text, Image, Button } from 'react-native'
import RNFS from 'react-native-fs'

import { Colors, Api } from '../../constants'

export default function Item({ item: { thumbnail, title, videoId } }) {
	const _downloadAudio = async () => {
		console.log(`${Api.BaseURI}/download/${videoId}`)
		const response = await fetch(`${Api.BaseURI}/download/${videoId}`)
		const { audio: fromUrl } = await response.json()

		const toURL = `${RNFS.DocumentDirectoryPath}/${videoId}.mp3`

		console.log(fromUrl, RNFS.DocumentDirectoryPath)

		await RNFS.downloadFile({
			fromUrl,
			toURL
		})
	}

	return (
		<View style={styles.item}>
			<Image source={{ uri: thumbnail }} style={styles.thumbnail} />
			<Text style={{ color: Colors.gray, flex: 1 }}>{title}</Text>
			<Button title="download" onPress={_downloadAudio} />
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
	thumbnail: { width: 60, height: 50, marginRight: 15 }
}
