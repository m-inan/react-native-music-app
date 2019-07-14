import React from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import { YTD } from '../../utils'
import { setList } from '../../reducers/Playlist/actions'

const getPlaylistsData = async () => {
	try {
		const { items } = await YTD('playlists')

		return await Promise.all(
			items.map(async ({ id, snippet: { title } }) => {
				let list = await YTD('playlistItems', { playlistId: id })

				list = list.items.map(
					({
						snippet: {
							title,
							thumbnails: {
								default: { url: thumbnail }
							},
							resourceId: { videoId }
						}
					}) => ({
						title,
						thumbnail,
						videoId
					})
				)

				return {
					id,
					title,
					list
				}
			})
		)
	} catch (e) {
		console.log(e)
	}
}

export default function Title({ items, index }) {
	const dispatch = useDispatch()

	const setData = async () => {
		const playlist = await getPlaylistsData()

		console.log(playlist)

		dispatch(setList(playlist))

		await AsyncStorage.setItem('playlist', JSON.stringify(playlist))
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{items.length && items[index].title}</Text>
			<Button title="set data" onPress={setData} style={styles.button} />
		</View>
	)
}

const styles = {
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		color: '#fff',
		fontSize: 30,
		padding: 20,
		flex: 1
	},
	button: {}
}
