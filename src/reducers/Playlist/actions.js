import * as types from './types'
import TrackPlayer from 'react-native-track-player'

export const setList = items => {
	return async dispatch => {
		const playlist = items[0]

		if (playlist && playlist.sounds) {
			const addList = playlist.sounds.map(({ title, artwork, id, source }) => ({
				id,
				title,
				artwork,
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

export function setPlaylist(id) {
	return {
		type: types.SET_PLAYLIST,
		payload: {
			id
		}
	}
}
