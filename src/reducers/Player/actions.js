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
	return async dispatch => {
		const state = await TrackPlayer.getState()

		dispatch({
			type: types.STATE,
			payload: {
				state
			}
		})
	}
}

export function playbackTrack() {
	return async (dispatch, getState) => {
		const { replay, shuffle, track: current, shuffleSkip } = getState().Player

		if (replay) {
			await TrackPlayer.skip(current.id)
			await TrackPlayer.play()
		} else {
			if (shuffle && !shuffleSkip) {
				let queue = await TrackPlayer.getQueue()
				queue = queue.filter(item => item.id !== current.id)

				const count = queue.length - 1
				const index = Math.floor(Math.random() * count)

				const trackId = queue[index].id

				dispatch(setShuffleSkip(true))

				await TrackPlayer.skip(trackId)
				await TrackPlayer.play()
			} else {
				const trackId = await TrackPlayer.getCurrentTrack()
				const duration = await TrackPlayer.getDuration()

				const track = await TrackPlayer.getTrack(trackId)

				dispatch({
					type: types.TRACK,
					payload: {
						track,
						duration
					}
				})
				dispatch(setShuffleSkip(false))
			}
		}
	}
}

export function updatePlayback() {
	return async dispatch => {
		dispatch(playbackState())

		dispatch(playbackTrack())
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

export function setShuffleSkip(shuffleSkip) {
	return {
		type: types.SHUFFLE_SKIP,
		payload: {
			shuffleSkip
		}
	}
}

export function playbackQueueEnded(position) {
	return async (dispatch, getState) => {
		const { shuffle } = getState().Player

		if (!shuffle && position > 0) {
			const queue = await TrackPlayer.getQueue()

			dispatch(setUserPlaying(false))

			TrackPlayer.skip(queue[0].id)
		} else {
			dispatch(playbackTrack())
		}
	}
}

export function playerReset() {
	return async dispatch => {
		await TrackPlayer.reset()

		dispatch({ type: types.RESET })
	}
}
