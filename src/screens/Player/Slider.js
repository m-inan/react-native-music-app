import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
	Dimensions,
	PanResponder,
	View,
	Animated,
	Text,
	Platform
} from 'react-native'
import TrackPlayer from 'react-native-track-player'
import Svg, { Circle, G, Path } from 'react-native-svg'
import { timeFormat, polarToCartesian, cartesianToPolar } from 'utils/index'
import { Colors } from 'constants'

const { width } = Dimensions.get('window')
const padding = 20
const r = (width - padding * 2) / 2
const cx = r + padding
const cy = padding
const height = (width + padding * 2) / 2

let interval

const STATE_READY = Platform.OS === 'ios' ? 'ready' : 6

export default function Slider({ positionY, miniPos }) {
	const { state, track, playing } = useSelector(state => state.Player)
	const [percent, setPercent] = useState(0)
	const [time, setTime] = useState(null)
	const [moveSlider, setMoveSlider] = useState(false)
	const [duration, setDuration] = useState(null)

	useEffect(() => {
		clearInterval(interval)

		const times = async () => {
			const current = Math.floor(await TrackPlayer.getPosition())

			if (!playing || current < 1) {
				setPercent(0)
				setTime(0)
			}
		}

		switch (state) {
			case STATE_READY:
				// user playing state

				times()
				break
			case TrackPlayer.STATE_PLAYING:
				if (!moveSlider) {
					interval = setInterval(async () => {
						const current = Math.floor(await TrackPlayer.getPosition())

						if (duration && current) {
							setTime(current)
							setPercent((current * 100) / Math.floor(duration))
						}
					}, 100)
				}
				break
		}
	}, [state, moveSlider])

	useEffect(() => {
		changePlaybackTrack()
	}, [track])

	const changePlaybackTrack = async () => {
		const currentDuration = await TrackPlayer.getDuration()
		setDuration(currentDuration)
	}

	const setProgress = (x, y) => {
		if (!track || state === STATE_READY) return

		const angleToPercent = (cartesianToPolar(x, y, { cy, cx }) / 180) * 100

		setTime((duration / 100) * angleToPercent)
		setPercent(angleToPercent)

		return true
	}

	const _panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => true,
		onStartShouldSetPanResponderCapture: () => {
			// start
			setMoveSlider(true)
		},
		onPanResponderRelease: () => {
			// end
			TrackPlayer.seekTo((duration / 100) * percent)

			setMoveSlider(false)
		},
		onPanResponderGrant: ({ nativeEvent: { locationX, locationY } }) =>
			setProgress(locationX, locationY),
		onPanResponderMove: ({ nativeEvent: { locationX, locationY } }) =>
			setProgress(locationX, locationY)
	})

	const { x, y } = polarToCartesian(
		((percent > 100 ? 100 : percent) * 180) / 100,
		{ cy, cx, r }
	)

	return (
		<Animated.View
			style={{
				opacity: positionY.interpolate({
					inputRange: [0, miniPos / 2, miniPos],
					outputRange: [1, 0, 0]
				}),
				...styles.container
			}}
		>
			<Text
				numberOfLines={1}
				style={[
					styles.current,
					moveSlider && {
						fontSize: 14,
						color: Colors.primary
					}
				]}
			>
				{timeFormat(time)}
			</Text>

			<Text numberOfLines={1} style={styles.duration}>
				{timeFormat(duration === null ? null : Math.floor(duration))}
			</Text>

			<View>
				<Svg width={'100%'} height={'100%'}>
					<G {..._panResponder.panHandlers}>
						<Path
							fill="none"
							stroke={Colors.gray}
							strokeWidth={5}
							d={`M${padding} ${cy} A ${r} ${r} 0 0 0 ${r * 2 + padding} ${cy}`}
						/>

						<Path
							fill="none"
							strokeWidth={5}
							stroke={Colors.primary}
							d={`M${padding} ${cy} A ${r} ${r} 0 0 0 ${x} ${y}`}
						/>

						<Circle
							cx="0"
							cy="0"
							r={10}
							x={Math.abs(x)}
							y={Math.abs(y)}
							fill={Colors.primary}
						/>
					</G>

					<Circle
						r={r - 30}
						fill="none"
						strokeWidth="2"
						cx={r + padding}
						cy={padding}
					/>
				</Svg>
			</View>
		</Animated.View>
	)
}

const styles = {
	container: {
		position: 'relative',
		top: 220,
		height,
		zIndex: 3
	},

	current: {
		top: -10,
		left: 0,
		width: padding * 2 + 20,
		position: 'absolute',
		color: '#ddd',
		textAlign: 'left',
		fontSize: 12,
		paddingLeft: 5
	},

	duration: {
		top: -10,
		right: 0,
		width: padding * 2 + 20,
		position: 'absolute',
		color: '#ddd',
		textAlign: 'right',
		fontSize: 12,
		paddingRight: 5
	}
}
