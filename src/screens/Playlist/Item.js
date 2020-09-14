import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import { itemPlay } from 'reducers/Player/actions'
import { Colors } from 'constants'

import { Play } from 'components/Icons'

export default function Item({ artwork, title, id, playlistId }) {
	const dispatch = useDispatch()

	const _play = async () => {
		dispatch(itemPlay(id, playlistId))
	}

	return (
		<View style={styles.item}>
			<Image source={artwork} style={styles.artwork} />
			<Text style={{ color: Colors.gray, flex: 1 }}>{title}</Text>
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
