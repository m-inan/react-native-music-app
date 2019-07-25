import * as types from './types'
import initialState from './initialState'

import { setPlaylist } from '../../utils'

export * from './actions'

export default function reducer(state = initialState(), { type, payload }) {
	switch (type) {
		case types.SET:
			return payload.items
		case types.SET_FILE_EXISTS:
			state = state.map(playlist => {
				if (playlist.id === payload.playlistId) {
					return {
						...playlist,
						list: playlist.list.map(item => {
							if (item.videoId === payload.videoId) {
								return {
									...item,
									exists: true,
									source: payload.source,
									artwork: payload.artwork
								}
							} else {
								return item
							}
						})
					}
				} else {
					return playlist
				}
			})

			setPlaylist(state)

			return state
		default:
			return state
	}
}
