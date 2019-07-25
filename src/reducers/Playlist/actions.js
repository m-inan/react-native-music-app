import * as types from './types'
import TrackPlayer from 'react-native-track-player'

import { playerReset } from '../Player/actions'

export const setList = items => {
	return async dispatch => {
		const playlist = items[0]

		if (playlist && playlist.list) {
			const addList = playlist.list
				.filter(item => item.exists)
				.map(({ title, artwork, videoId, source }) => ({
					title,
					artwork,
					id: videoId,
					url: source,
					artist: 'Minan'
				}))

			await TrackPlayer.add(addList)
		}

		dispatch({
			type: types.SET,
			payload: {
				items
			}
		})
	}
}

export const setAudioFileExists = (playlistId, videoId, source) => {
	return async (dispatch, getState) => {
		const activeList = getState()
			.Playlist.find(item => item.id === playlistId)
			.list.filter(item => item.exists || item.videoId === videoId)

		const find = item => item.videoId === videoId

		const index = activeList.findIndex(find)
		const { title, artwork } = activeList.find(find)

		let insertBeforeId

		if (activeList.length > 0) {
			const beforeItem = activeList[index + 1]

			if (beforeItem) {
				insertBeforeId = beforeItem.videoId
			}
		}

		await TrackPlayer.add(
			{
				title,
				artwork,
				id: videoId,
				url: source,
				artist: 'Minan'
			},
			insertBeforeId
		)

		dispatch({
			type: types.SET_FILE_EXISTS,
			payload: {
				playlistId,
				videoId,
				source
			}
		})
	}
}

export function setActiveList(playlist) {
	return async dispatch => {
		dispatch(playerReset())

		if (playlist && playlist.list) {
			const addList = playlist.list
				.filter(item => item.exists)
				.map(({ title, artwork, videoId, source }) => ({
					title,
					artwork,
					id: videoId,
					url: source,
					artist: 'Minan'
				}))

			await TrackPlayer.add(addList)
		}
	}
}
