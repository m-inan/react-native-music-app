import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Animated, Text, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

function Title({ positionY, miniPos, Player: { track } }) {
	const [textWidth, setTextWidth] = useState(0)
	const [change, setChange] = useState(true)

	const top = positionY.interpolate({
		inputRange: [0, miniPos],
		outputRange: [miniPos / 2 + 150, 30]
	})

	const right = positionY.interpolate({
		inputRange: [0, miniPos],
		outputRange: [(width - textWidth) / 2, 120]
	})

	return (
		<Animated.View
			style={{
				top,
				right,
				...styles.container
			}}
			onLayout={({ nativeEvent: { layout } }) => {
				if (change) {
					setChange(false)
					setTextWidth(layout.width)
				}
			}}
		>
			<Text style={styles.title}>{track ? track.title : 'Not Playing'}</Text>
			<Text style={styles.singer}>{track && track.artist}</Text>
		</Animated.View>
	)
}

export default connect(state => state)(Title)

const styles = {
	container: {
		flex: 1,
		alignSelf: 'flex-end',
		minWidth: 'auto',
		alignItems: 'center',
		position: 'absolute'
	},

	title: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold'
	},

	singer: {
		color: '#fff',
		fontSize: 12
	}
}
