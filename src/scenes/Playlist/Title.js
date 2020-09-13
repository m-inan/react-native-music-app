import React from 'react'
import { View, Text } from 'react-native'

export default function Title({ items, index }) {
	return (
		<View style={styles.container}>
			<Text numberOfLines={1} style={styles.title}>
				{items.length && items[index].title}
			</Text>
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
	}
}
