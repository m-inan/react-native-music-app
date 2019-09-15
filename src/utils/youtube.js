import { Platform } from 'react-native'
import { GoogleSignin } from 'react-native-google-signin'
import RNFS from 'react-native-fs'
import { buildQueryString } from './URL'

export const YTD = async (route, accessToken, param = {}) => {
	const queryString = buildQueryString({
		part: 'snippet,contentDetails',
		mine: true,
		maxResults: 50,
		...param
	})

	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/${route}?${queryString}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	)

	return await response.json()
}

export const getPlaylistsData = async () => {
	GoogleSignin.configure({
		scopes: ['https://www.googleapis.com/auth/youtube.readonly']
	})

	await GoogleSignin.hasPlayServices()
	await GoogleSignin.signIn()

	const { accessToken } = await GoogleSignin.getTokens()

	const { items } = await YTD('playlists', accessToken)

	return await Promise.all(
		items.map(async ({ id, snippet: { title } }) => {
			let list = await YTD('playlistItems', accessToken, { playlistId: id })
			let nextPageToken = list.nextPageToken

			while (nextPageToken) {
				const { items, newNextPageToken } = await YTD(
					'playlistItems',
					accessToken,
					{ playlistId: id, pageToken: nextPageToken }
				)

				list.items = [...list.items, ...items]

				nextPageToken = newNextPageToken
			}

			list = await Promise.all(
				list.items.map(async item => {
					const {
						snippet: {
							title,
							thumbnails,
							resourceId: { videoId }
						}
					} = item

					let artwork

					const types = ['maxres', 'standard', 'high', 'medium', 'default']

					if (thumbnails) {
						for (const type of types) {
							if (thumbnails[type]) {
								artwork = thumbnails[type].url

								break
							}
						}
					}

					const imageFile = `${RNFS.DocumentDirectoryPath}/${videoId}.jpg`

					if (artwork) {
						await RNFS.downloadFile({
							fromUrl: artwork,
							toFile: imageFile
						})
					}

					const filePath = `${RNFS.DocumentDirectoryPath}/${videoId}.mp3`

					return {
						title,
						videoId,
						exists: await RNFS.exists(filePath),
						artwork: Platform.OS === 'ios' ? imageFile : `file://${imageFile}`,
						source: Platform.OS === 'ios' ? filePath : `file://${filePath}`
					}
				})
			)

			return {
				id,
				title,
				list
			}
		})
	)
}
