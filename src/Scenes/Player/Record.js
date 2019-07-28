import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	Animated,
	Dimensions,
	Easing,
	TouchableWithoutFeedback
} from 'react-native'
import { setUserPlaying } from '../../reducers/Player/actions'

import { Play, Pause } from '../../components/Icons'

const { width } = Dimensions.get('window')
const spinValue = new Animated.Value(0)

const rotate = spinValue.interpolate({
	inputRange: [0, 1],
	outputRange: ['1deg', '360deg']
})

function Record({ positionY, miniPos }) {
	const dispatch = useDispatch()
	const { state, track, playing } = useSelector(state => state.Player)

	useEffect(() => {
		switch (state) {
			case 'playing':
				Animated.loop(
					Animated.sequence([
						Animated.timing(spinValue, {
							toValue: 1,
							duration: 10000,
							easing: Easing.linear
						})
					])
				).start()
				break

			case 'paused':
				spinValue.stopAnimation()
				spinValue.extractOffset()
				break

			case 'ready':
				spinValue.flattenOffset()
				break
		}
	}, [state])

	const ranges = {
		layout: [width - 100, 90],
		tLayout: [width - 140, 70],
		tRadius: [(width - 140) / 2, 35],
		translateY: [100, 5],
		translateX: [-20, -5],
		miniLayout: [50, 20],
		right: [(width - (width - 60)) / 2, 0]
	}

	for (const key in ranges) {
		ranges[key] = positionY.interpolate({
			inputRange: [0, miniPos],
			outputRange: ranges[key]
		})
	}

	const borderWidth = positionY.interpolate({
		inputRange: [0, 100, miniPos],
		outputRange: [10, 0, 0]
	})

	const miniControllerOpacity = positionY.interpolate({
		inputRange: [0, miniPos - 100, miniPos],
		outputRange: [0, 0, 1]
	})

	return (
		<TouchableWithoutFeedback
			onPress={() => dispatch(setUserPlaying(!playing))}
		>
			<Animated.View
				style={{
					...styles.container,
					width: ranges.layout,
					height: ranges.layout,
					right: ranges.right,
					transform: [
						{
							translateY: ranges.translateY
						},
						{
							translateX: ranges.translateX
						}
					]
				}}
			>
				{track && (
					<Animated.Image
						style={{
							borderRadius: ranges.tRadius,
							width: ranges.tLayout,
							height: ranges.tLayout,
							transform: [{ rotate }]
						}}
						source={{ uri: track.artwork }}
					/>
				)}

				<Animated.View
					style={{
						...styles.miniCircle,
						width: ranges.miniLayout,
						height: ranges.miniLayout,
						borderWidth: borderWidth
					}}
				/>
				<Animated.View
					style={[styles.miniControl, { opacity: miniControllerOpacity }]}
				>
					{playing ? <Pause /> : <Play />}
				</Animated.View>
			</Animated.View>
		</TouchableWithoutFeedback>
	)
}

const styles = {
	container: {
		top: 0,
		position: 'absolute',
		borderRadius: width / 2,
		backgroundColor: 'rgb(26, 30, 34)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2
	},

	miniCircle: {
		borderRadius: 100,
		borderColor: 'rgb(225, 48, 129)',
		backgroundColor: 'rgb(49, 56, 62)',
		position: 'absolute'
	},
	miniControl: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		padding: 35
	}
}

export default Record
