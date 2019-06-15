import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Options(props) {
	return (
		<Svg {...props} viewBox="0 0 20 20">
			<Path
				d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
				fill="#fff"
			/>
		</Svg>
	)
}
