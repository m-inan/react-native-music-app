import React from 'react'
import { View } from 'react-native'

import Lists from './Lists'
import { Colors } from '../../constants'

export default function Playlist() {
	return (
		<View style={styles.container}>
			<Lists />
		</View>
	)
}

const styles = {
	container: { flex: 1, backgroundColor: Colors.layoutBG }
}
