import TrackPlayer from 'react-native-track-player'
import * as types from './types'

export function initializePlayback() {
	return async dispatch => {
		TrackPlayer.updateOptions({
			capabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_SEEK_TO,
				TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
				TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
			]
		})

		await TrackPlayer.setupPlayer({
			maxCacheSize: 1024 * 5 // 5 mb
		})

		dispatch({ type: types.INIT })
	}
}

export function playbackState(state) {
	return {
		type: types.STATE,
		payload: {
			state
		}
	}
}

export function playbackTrack(trackId) {
	return async dispatch => {
		const duration = await TrackPlayer.getDuration()
		const track = await TrackPlayer.getTrack(trackId)

		dispatch({
			type: types.TRACK,
			payload: {
				track,
				duration
			}
		})
	}
}

export function updatePlayback() {
	return async dispatch => {
		try {
			dispatch(playbackState(await TrackPlayer.getState()))

			dispatch(playbackTrack(await TrackPlayer.getCurrentTrack()))
		} catch (e) {
			console.log(e)
		}
	}
}

export function setUserPlaying(playing) {
	TrackPlayer[playing ? 'play' : 'pause']()

	return {
		type: types.PLAYING,
		payload: {
			playing
		}
	}
}

export function setShuffle(shuffle) {
	return {
		type: types.SHUFFLE,
		payload: {
			shuffle
		}
	}
}

export function setReplay(replay) {
	return {
		type: types.REPLAY,
		payload: {
			replay
		}
	}
}
