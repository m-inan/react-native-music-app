import React from 'react'
import { Animated, Dimensions } from 'react-native'
import { Drag } from '../../components/Icons'

const { width } = Dimensions.get('window')

export default function Handle(props) {
	const opacity = props.positionY.interpolate({
		inputRange: [0, 50, props.miniPos],
		outputRange: [0, 0, 1]
	})

	return (
		<Animated.View {...props} style={{ ...styles.container, opacity }}>
			<Drag style={styles.drag} />
		</Animated.View>
	)
}

const styles = {
	container: {
		width,
		height: 100,
		position: 'absolute',
		top: 0,
		left: 0,
		justifyContent: 'center',
		paddingHorizontal: 10,
		backgroundColor: 'transparent'
	},

	drag: {
		width: 30,
		height: 30
	}
}
