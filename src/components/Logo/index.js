import React from 'react'
import { View } from 'react-native'
import { Music } from '../Icons'
import DeviceInfo from 'react-native-device-info'

const isiPhoneX = /iPhone X/g.test(DeviceInfo.getDeviceName())

export default function Logo() {
	return (
		<View style={styles.container} pointerEvents="none">
			<Music />
		</View>
	)
}

const styles = {
	container: {
		height: 30,
		position: 'absolute',
		width: '100%',
		top: isiPhoneX ? 40 : 25,
		alignItems: 'center',
		zIndex: 9999
	}
}
