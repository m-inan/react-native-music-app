import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	Animated,
	Dimensions,
	Easing,
	TouchableWithoutFeedback,
	Platform,
	Image
} from 'react-native'
import { setUserPlaying } from 'reducers/Player/actions'
import TrackPlayer from 'react-native-track-player'

import { Play, Pause } from 'components/Icons'

const STATE_READY = Platform.OS === 'ios' ? 'ready' : 6

const { width } = Dimensions.get('window')
const spinValue = new Animated.Value(0)

const rotate = spinValue.interpolate({
	inputRange: [0, 1],
	outputRange: ['1deg', '360deg']
})

function Record({ positionY, miniPos }) {
	const dispatch = useDispatch()
	const { state, track, playing } = useSelector(state => state.Player)

	const artwork = useMemo(() => (track ? track.artwork : ''), [track])

	console.log(artwork)

	useEffect(() => {
		switch (state) {
			case TrackPlayer.STATE_PLAYING:
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

			case TrackPlayer.STATE_PAUSED:
				spinValue.stopAnimation()
				spinValue.extractOffset()
				break

			case STATE_READY:
				spinValue.flattenOffset()
				break
		}
	}, [state])

	const ranges = {
		layout: [width - 100, 90],
		tLayout: [width - 140, 70],
		translateY: [Platform.OS === 'ios' ? 100 : 80, 5],
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
			onPress={() => {
				if (positionY._value === miniPos) {
					dispatch(setUserPlaying(!playing))
				}
			}}
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
					<Animated.View
						style={{
							width: ranges.tLayout,
							height: ranges.tLayout,
							transform: [{ rotate }]
						}}
					>
						<Image
							style={{
								width: '100%',
								height: '100%',
								borderRadius: width / 2
							}}
							source={{
								uri:
									artwork +
									(Platform.OS === 'android' ? `?time=${new Date()}` : '')
							}}
						/>
					</Animated.View>
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
