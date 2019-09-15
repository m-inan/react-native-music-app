import React, { useEffect } from 'react'
import Svg, { Path } from 'react-native-svg'
import { Animated } from 'react-native'
import { useSelector } from 'react-redux'
import TrackPlayer from 'react-native-track-player'

const slide = new Animated.Value(0)

export function Music() {
	const { state } = useSelector(state => state.Player)

	useEffect(() => {
		switch (state) {
			case TrackPlayer.STATE_PLAYING:
				Animated.loop(
					Animated.sequence([
						Animated.timing(slide, {
							toValue: 5,
							duration: 1000
						}),
						Animated.timing(slide, {
							toValue: 0,
							duration: 1000
						})
					])
				).start()
				break

			case TrackPlayer.STATE_STOPPED:
			case TrackPlayer.STATE_PAUSED:
				slide.stopAnimation()
				break
		}
	}, [state])

	return (
		<Animated.View
			style={{
				transform: [{ translateY: slide }]
			}}
		>
			<Svg width="30" height="30" viewBox="0 0 55 55">
				<Path
					d="M52.66,0.249c-0.216-0.189-0.501-0.275-0.789-0.241l-31,4.011C20.373,4.084,20,4.507,20,5.01v6.017v4.212v25.384
          C18.174,38.428,15.273,37,12,37c-5.514,0-10,4.037-10,9s4.486,9,10,9s10-4.037,10-9c0-0.232-0.019-0.46-0.039-0.687
          C21.974,45.248,22,45.189,22,45.121V16.118l29-3.753v18.257C49.174,28.428,46.273,27,43,27c-5.514,0-10,4.037-10,9s4.486,9,10,9
          c5.464,0,9.913-3.966,9.993-8.867c0-0.013,0.007-0.024,0.007-0.037V11.227V7.016V1C53,0.712,52.876,0.438,52.66,0.249z M12,53
          c-4.411,0-8-3.141-8-7s3.589-7,8-7s8,3.141,8,7S16.411,53,12,53z M43,43c-4.411,0-8-3.141-8-7s3.589-7,8-7s8,3.141,8,7
          S47.411,43,43,43z M22,14.101v-3.074V5.889l29-3.752v4.879v3.332L22,14.101z"
					fill="#fff"
				/>
			</Svg>
		</Animated.View>
	)
}
