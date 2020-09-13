import React from 'react'
import { useSelector } from 'react-redux'
import { Animated, Text, Dimensions } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const { width: windowWidth } = Dimensions.get('window')
const isiPhoneX = /iPhone X/g.test(DeviceInfo.getDeviceName())

export default function Title({ positionY, miniPos }) {
	const { track } = useSelector(state => state.Player)

	const top = positionY.interpolate({
		inputRange: [-40, miniPos],
		outputRange: [miniPos / 2 + 160 - (isiPhoneX ? 70 : 0), 30]
	})

	const right = positionY.interpolate({
		inputRange: [0, miniPos],
		outputRange: [0, 120]
	})

	const width = positionY.interpolate({
		inputRange: [0, miniPos],
		outputRange: [windowWidth, windowWidth - 180]
	})

	const paddingHorizontal = positionY.interpolate({
		inputRange: [0, miniPos],
		outputRange: [50, 0]
	})

	return (
		<Animated.View
			style={{
				top,
				right,
				width,
				paddingHorizontal,
				...styles.container
			}}
		>
			<Text numberOfLines={1} style={styles.title}>
				{track ? track.title : 'Not Playing'}
			</Text>
		</Animated.View>
	)
}

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
