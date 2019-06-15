import React from 'react'
import { Animated } from 'react-native'

import { ChevronDown, Options } from '../../components/Icons'

export default function Header({ positionY, miniPos }) {
	const opacity = positionY.interpolate({
		inputRange: [0, 50, miniPos],
		outputRange: [1, 0, 0]
	})

	return (
		<Animated.View style={{ ...styles.container, opacity }}>
			<ChevronDown style={styles.chevron} />

			<Options style={styles.options} />
		</Animated.View>
	)
}

const styles = {
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: 70,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 20,
		paddingHorizontal: 10
	},

	chevron: {
		width: 25,
		height: 25
	},

	options: {
		width: 30,
		height: 30,
		marginLeft: 'auto'
	}
}
