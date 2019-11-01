import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'

import { ListDownload } from 'components/Icons'

import { getPlaylistsData, setPlaylist } from 'utils'
import { setList } from 'reducers/Playlist/actions'

export default function Title({ items, index }) {
	const dispatch = useDispatch()
	const [isProgress, setProgress] = useState(false)

	const setData = async () => {
		setProgress(true)

		const playlist = await getPlaylistsData()

		dispatch(setList(playlist))

		setProgress(false)
		setPlaylist(playlist)
	}

	return (
		<View style={styles.container}>
			<Text numberOfLines={1} style={styles.title}>
				{items.length && items[index].title}
			</Text>
			<TouchableOpacity onPress={setData}>
				<View style={{ paddingHorizontal: 20 }}>
					{isProgress ? (
						<ActivityIndicator />
					) : (
						<ListDownload style={styles.icon} />
					)}
				</View>
			</TouchableOpacity>
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
	icon: {
		width: 25,
		height: 25
	}
}
