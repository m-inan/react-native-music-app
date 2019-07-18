import * as types from './types'
import TrackPlayer from 'react-native-track-player'

export const setList = items => {
	return async dispatch => {
		for (const playlist of items) {
			for (const item of playlist.list) {
				if (item.exists) {
					const { title, thumbnail, videoId, source } = item

					await TrackPlayer.add({
						title,
						thumbnail,
						id: videoId,
						url: source,
						artist: 'Minan'
					})
				}
			}
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
	return {
		type: types.SET_FILE_EXISTS,
		payload: {
			playlistId,
			videoId,
			source
		}
	}
}
