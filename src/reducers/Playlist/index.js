import * as types from './types'
import initialState from './initialState'

import { setPlaylist } from '../../utils'

export * from './actions'

export default function reducer(state = initialState(), { type, payload }) {
	switch (type) {
		case types.SET: {
			const { items } = payload

			if (items.length) {
				const { id } = items[0]

				return {
					id,
					items
				}
			} else {
				return state
			}
		}

		case types.SET_PLAYLIST:
			return {
				...state,
				id: payload.id
			}
		case types.SET_FILE_EXISTS: {
			const items = state.items.map(playlist => {
				return {
					...playlist,
					list: playlist.list.map(item => {
						if (item.videoId === payload.videoId) {
							return {
								...item,
								exists: true
							}
						} else {
							return item
						}
					})
				}
			})

			setPlaylist(items)

			return {
				...state,
				items
			}
		}

		case types.SET_FILE_LOADING: {
			const items = state.items.map(playlist => {
				return {
					...playlist,
					list: playlist.list.map(item => {
						if (item.videoId === payload.videoId) {
							return {
								...item,
								loading: payload.loading
							}
						} else {
							return item
						}
					})
				}
			})

			return {
				...state,
				items
			}
		}

		case types.MULTPLE_DOWNLOAD_LOADING:
			return {
				...state,
				items: state.items.map(item => {
					if (item.id === payload.playlistId) {
						return {
							...item,
							loading: payload.loading
						}
					} else return item
				})
			}
		default:
			return state
	}
}
