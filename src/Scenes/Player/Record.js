import React, { useEffect, useState, useContext } from 'react'
import { Animated, Dimensions, Easing, TouchableWithoutFeedback } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { Context } from '../../Stores'
import { setUserPlaying } from '../../Stores/Player/actions'
import TrackPlayer from 'react-native-track-player'


const { width } = Dimensions.get('window')
const isPhoneX = /iPhone X/g.test(DeviceInfo.getDeviceName())
const spinValue = new Animated.Value(0)

const rotate = spinValue.interpolate({
	inputRange: [0, 1],
  outputRange: ['1deg', '360deg']
})


export default function Record ({ positionY, miniPos }) {
	const { state: { Player }, dispatch } = useContext(Context)

	const ranges = {
		layout: [width - 100, 90],
		tLayout: [width - 140, 70],
		tRadius: [(width - 140) / 2, 35],
		translateY: [isPhoneX ? 150 : 100, 5],
		translateX: [-20, -5],
		miniLayout: [50, 20],
		right: [(width - (width - 60)) / 2, 0]
	}

	for ( const key in ranges ) {
		ranges[key] = positionY.interpolate({
			inputRange: [0, miniPos],
			outputRange: ranges[key]
		})
	}	
	
	const borderWidth = positionY.interpolate({
		inputRange: [0, 100, miniPos],
		outputRange: [10, 0, 0]
	})


	useEffect(() => {
		switch(Player.state) {
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
			break;

			case 'paused':
				spinValue.stopAnimation()
				spinValue.extractOffset()
			break;

			case 'ready':
				spinValue.flattenOffset()
			break;
		}
	}, [Player.state])


	return (
		<TouchableWithoutFeedback onPress={() => {
			dispatch(setUserPlaying(!Player.isPlaying))
			TrackPlayer[Player.isPlaying ? 'pause' : 'play']()
		}}>
			<Animated.View style={{
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
			}}>
				{ Player.track && <Animated.Image style={{
					borderRadius: ranges.tRadius,
					width: ranges.tLayout,
					height: ranges.tLayout,
					transform: [
						{ rotate }
					]
				}} source={{ uri: Player.track.thumbnail }} /> }

				<Animated.View style={{
					...styles.miniCircle,
					width: ranges.miniLayout,
					height: ranges.miniLayout,
					borderWidth: borderWidth
				}} />
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
	}
}