import * as types from './types'

export const setList = items => {
	return {
		type: types.SET,
		payload: {
			items
		}
	}
}

export const setAudioFileExists = (playlistId, videoId) => {
	return {
		type: types.SET_FILE_EXISTS,
		payload: {
			playlistId,
			videoId
		}
	}
}
