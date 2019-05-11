import TrackPlayer from 'react-native-track-player'
import { playbackState, playbackTrack, setUserPlaying } from './actions'


async function Handler(dispatch, data) {

	console.log(data.type)
	switch( data.type ) {
		case 'remote-play':
			TrackPlayer.play()
			break;
		case 'remote-pause':
			TrackPlayer.pause()
			break;
		case 'remote-stop':
			TrackPlayer.stop()
			break;
		case 'remote-next':
			TrackPlayer.skipToNext()
			break;
		case 'remote-previous':
			TrackPlayer.skipToPrevious()
			break;
		case 'remote-seek':
			TrackPlayer.seekTo(data.position)
			break;
		case 'remote-duck':
			TrackPlayer.setVolume(data.ducking ? 0.5 : 1)
			break;
		case 'playback-state':
			dispatch(playbackState(data.state))
			break;
		case 'playback-track-changed':

			dispatch(playbackTrack(data.nextTrack))

			break;
		case 'playback-queue-ended':
			// finish

			break;
		case 'playback-error':
				console.log(data.error)
			break;
	}
}


export default dispatch => Handler.bind(null, dispatch)