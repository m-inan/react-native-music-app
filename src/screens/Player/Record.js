import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	View,
	Animated,
	Dimensions,
	Easing,
	TouchableWithoutFeedback,
	Platform,
	Image
} from 'react-native'
import { setUserPlaying } from 'reducers/Player/actions'

import { Colors } from 'constants'
import { Play, Pause } from 'components/Icons'

const { width } = Dimensions.get('window')
const spinValue = new Animated.Value(0)

const rotate = spinValue.interpolate({
	inputRange: [0, 1],
	outputRange: ['1deg', '360deg']
})

const sizes = {
	default: width - 100,
	mini: 90
}

function Record({ positionY, miniPos }) {
	const dispatch = useDispatch()
	const { track, playing } = useSelector(state => state.Player)

	const artwork = useMemo(() => (track ? track.artwork : ''), [track])

	const runAnimation = () => {
		if (playing) {
			Animated.loop(
				Animated.sequence([
					Animated.timing(spinValue, {
						toValue: 1,
						duration: 10000,
						easing: Easing.linear,
						useNativeDriver: false
					})
				])
			).start()
		}
	}

	useEffect(() => {
		if (playing) {
			runAnimation()
		} else {
			spinValue.stopAnimation()
			spinValue.extractOffset()
		}
	}, [playing])

	useEffect(() => {
		spinValue.flattenOffset()
		spinValue.setValue(0)

		runAnimation()
	}, [track])

	const ranges = {
		layout: [sizes.default, sizes.mini],
		tLayout: [width - 140, 70],
		translateY: [Platform.OS === 'ios' ? 100 : 80, 5],
		translateX: [-20, -5],
		miniLayout: [50, 20],
		right: [(width - (width - 60)) / 2, 0],
		radius: [sizes.default / 2, sizes.mini / 2]
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

	const innerCircle = positionY.interpolate({
		inputRange: [0, miniPos],
		outputRange: [1, 0]
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
							transform: [{ rotate }],
							borderRadius: ranges.radius,
							overflow: 'hidden',
							position: 'relative'
						}}
					>
						<View>
							<Image
								style={{
									width: '100%',
									height: '100%'
								}}
								source={artwork}
							/>
							<Animated.View
								style={{
									top: 0,
									left: 0,
									padding: 7,
									width: '100%',
									height: '100%',
									opacity: innerCircle,
									position: 'absolute',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<View
									style={{
										opacity: 0.7,
										width: '100%',
										height: '100%',
										borderWidth: 2,
										borderRadius: width,
										borderColor: Colors.primary
									}}
								/>
							</Animated.View>
						</View>
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
		borderRadius: sizes.default / 2,
		backgroundColor: 'rgb(26, 30, 34)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2
	},

	miniCircle: {
		borderColor: 'rgb(225, 48, 129)',
		backgroundColor: 'rgb(49, 56, 62)',
		position: 'absolute',
		borderRadius: 50
	},
	miniControl: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		padding: 35
	}
}

export default Record
