import { Alert, Platform } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import {
	playbackState,
	playbackTrack,
	playbackQueueEnded,
	setUserPlaying
} from '../reducers/Player/actions'

async function Handler(dispatch) {
	TrackPlayer.addEventListener('remote-play', () =>
		dispatch(setUserPlaying(true))
	)

	TrackPlayer.addEventListener('remote-pause', () =>
		dispatch(setUserPlaying(false))
	)

	TrackPlayer.addEventListener('remote-stop', () => {
		dispatch(setUserPlaying(false))
		TrackPlayer.stop()
	})

	TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext())

	TrackPlayer.addEventListener('remote-previous', async () => {
		const time = await TrackPlayer.getPosition()

		if (time <= 3) {
			TrackPlayer.skipToPrevious()
		} else {
			TrackPlayer.seekTo(0)
		}
	})

	TrackPlayer.addEventListener('remote-seek', ({ position }) =>
		TrackPlayer.seekTo(position)
	)

	if (Platform.OS !== 'ios') {
		// this event type is not supported on iOS
		TrackPlayer.addEventListener('remote-duck', ({ ducking }) => {
			TrackPlayer.setVolume(ducking ? 0.5 : 1)
		})
	}
	TrackPlayer.addEventListener('playback-state', () =>
		dispatch(playbackState())
	)

	TrackPlayer.addEventListener('playback-track-changed', () => {
		dispatch(playbackTrack())
	})

	TrackPlayer.addEventListener('playback-queue-ended', ({ position }) => {
		dispatch(playbackQueueEnded(position))
	})

	TrackPlayer.addEventListener('playback-error', data => {
		Alert.alert('Something went wrong. Please try again later.')
		console.log('playback-error', data)
	})
}

export default dispatch => Handler.bind(null, dispatch)
