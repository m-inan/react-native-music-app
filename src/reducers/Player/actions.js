import TrackPlayer from 'react-native-track-player'
import RNFS from 'react-native-fs'

import * as types from './types'

import { Api } from 'constants'

import {
	setAudioFileExists,
	setFileLoading,
	setPlaylist
} from '../Playlist/actions'

export function initializePlayback() {
	return async (dispatch, getState) => {
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

		setInterval(async () => {
			const [position, duration] = await Promise.all([
				TrackPlayer.getPosition(),
				TrackPlayer.getDuration()
			])

			const { replay, shuffle, track } = getState().Player

			if (position && duration && position >= duration) {
				if (replay) {
					await TrackPlayer.seekTo(0)
				} else if (shuffle) {
					let queue = await TrackPlayer.getQueue()
					queue = queue.filter(item => item.id !== track.id)

					const count = queue.length - 1
					const index = Math.floor(Math.random() * count)

					const trackId = queue[index].id

					await TrackPlayer.skip(trackId)
				}
			}
		}, 500)

		dispatch({ type: types.INIT })
	}
}

export function playbackState() {
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
	return async dispatch => {
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
	}
}

export function updatePlayback() {
	return async dispatch => {
		dispatch(playbackState())
	}
}

export function setUserPlaying(playing) {
	return (dispatch, getState) => {
		const { track } = getState().Player

		if (track) {
			TrackPlayer[playing ? 'play' : 'pause']()

			dispatch({
				type: types.PLAYING,
				payload: {
					playing
				}
			})
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
	return { type: types.RESET }
}

export function downloadAudio(videoId, playlistId) {
	return async dispatch => {
		const toFile = `${RNFS.DocumentDirectoryPath}/${videoId}.mp3`

		dispatch(setFileLoading(videoId, true))

		const response = await fetch(`${Api.SERVICE_URL}/download/${videoId}`)
		const { audio: fromUrl } = await response.json()

		const { promise } = RNFS.downloadFile({
			fromUrl,
			toFile,
			progressDivider: 5,
			progress: res => console.log('progress', res),
			begin: res => console.log('begin', res)
		})

		try {
			await promise

			console.log('success')

			dispatch(setAudioFileExists(playlistId, videoId))
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(setFileLoading(videoId, false))
		}
	}
}

export function itemPlay(videoId, playlistId) {
	return async (dispatch, getState) => {
		const { id, items } = getState().Playlist

		if (playlistId !== id) {
			await TrackPlayer.reset()

			dispatch(playerReset())

			const addList = items
				.find(item => item.id === playlistId)
				.list.filter(item => item.exists)
				.map(({ title, artwork, videoId, source }) => ({
					title,
					artwork,
					id: videoId,
					url: source,
					artist: 'Minan'
				}))

			await TrackPlayer.add(addList)

			dispatch(setPlaylist(playlistId))
		}

		await TrackPlayer.skip(videoId)

		await new Promise(resolve => setTimeout(resolve, 100))

		dispatch(setUserPlaying(true))
	}
}
