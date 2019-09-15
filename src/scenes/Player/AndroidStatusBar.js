import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { Colors } from '../../constants'

export default function AndroidStatusBar({ positionY }) {
	const [barColor, setBarColor] = useState(Colors.layoutBG)

	const changeStatusBarColor = ({ value }) => {
		const changedColor = value === 0 ? Colors.playerBG : Colors.layoutBG

		if (changedColor !== barColor) {
			setBarColor(changedColor)
		}
	}

	useEffect(() => {
		positionY.addListener(changeStatusBarColor)

		return () => {
			positionY.removeListener(changeStatusBarColor)
		}
	}, [positionY])

	return <StatusBar backgroundColor={barColor} barStyle="light-content" />
}
