import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import { itemPlay } from 'reducers/Player/actions'
import { Colors } from 'constants'

import { Play } from 'components/Icons'

export default function Item({ artwork, title, artist, id, playlistId }) {
	const dispatch = useDispatch()

	const _play = async () => {
		dispatch(itemPlay(id, playlistId))
	}

	return (
		<View style={styles.item}>
			<Image source={artwork} style={styles.artwork} />
			<View style={{ flex: 1 }}>
				<Text style={{ color: Colors.gray }}>{title}</Text>
				<Text
					style={{ color: 'rgb(82, 88, 94)' }}
					numberOfLines={2}
					ellipsizeMode="tail"
				>
					{artist}
				</Text>
			</View>
			<TouchableOpacity onPress={_play}>
				<View style={styles.play}>
					<Play />
				</View>
			</TouchableOpacity>
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
	play: {
		width: 50,
		height: 50,
		padding: 5,
		paddingLeft: 20
	}
}
