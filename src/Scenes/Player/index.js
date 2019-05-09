import React, { useContext } from 'react'
import { View, Dimensions, Animated } from 'react-native'

import { _panResponder, positionY, miniPos } from './Animation'

import Header from './Header'
import Slider from './Slider'
import Record from './Record'
import Title from './Title'
import Controllers from './Controllers'

const { width, height } = Dimensions.get('window')

export default function Player () {
	const animation = {
		miniPos,
		positionY
	}

	return (
		<Animated.View style={styles.container}>
			<Header {...animation} />
		
			<Slider {...animation} />

			<Record {...animation} />
			<Title {...animation} />

			<Controllers />

			<View
				{..._panResponder.panHandlers}
				style={styles.handleArea} 
			/>
		</Animated.View>
	)
}


const styles = {
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		width,
		height,
		backgroundColor: 'rgb(35, 40, 44)',
		transform: [ { translateY: positionY } ]
	},

	handleArea: {
		width,
		height: 100,
		position: 'absolute',
		top: 0,
		left: 0,
	}
}