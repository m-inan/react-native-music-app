import React from 'react'
import Svg, { Path, G } from 'react-native-svg'

export function Menu() {
	return (
		<Svg viewBox="0 0 53 53" width="20" height="20">
			<G>
				<Path
					d="M2,13.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,13.5,2,13.5z"
					fill="#fff"
				/>
				<Path
					d="M2,28.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,28.5,2,28.5z"
					fill="#fff"
				/>
				<Path
					d="M2,43.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,43.5,2,43.5z"
					fill="#fff"
				/>
			</G>
		</Svg>
	)
}
