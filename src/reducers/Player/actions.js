import TrackPlayer from 'react-native-track-player'
import RNFS from 'react-native-fs'

import * as types from './types'

import { Api } from '../../constants'

import {
	setAudioFileExists,
	setFileLoading,
	setPlaylist
} from '../Playlist/actions'

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

				if (shuffleSkip) {
					dispatch(setShuffleSkip(false))
				}
			}
		}
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
	return { type: types.RESET }
}

export function downloadAudio(videoId, playlistId) {
	return async dispatch => {
		const toFile = `${RNFS.DocumentDirectoryPath}/${videoId}.mp3`

		dispatch(setFileLoading(videoId, true))

		const response = await fetch(`${Api.BaseURI}/download/${videoId}`)
		const { audio: fromUrl } = await response.json()

		await RNFS.downloadFile({
			fromUrl,
			toFile
		})

		// wait download complete
		await new Promise(resolve => setTimeout(resolve, 300))

		dispatch(setFileLoading(videoId, false))
		dispatch(setAudioFileExists(playlistId, videoId))
	}
}

export function itemPlay(videoId, playlistId) {
	return async (dispatch, getState) => {
		const { id, items } = getState().Playlist

		dispatch(setShuffleSkip(true))

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
