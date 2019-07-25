import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import RNFS from 'react-native-fs'

import { ListDownload } from '../../components/Icons'

GoogleSignin.configure({
	scopes: ['https://www.googleapis.com/auth/youtube.readonly']
})

import { YTD, setPlaylist } from '../../utils'
import { setList } from '../../reducers/Playlist/actions'

export default function Title({ items, index }) {
	const [isProgress, setProgress] = useState(false)
	const dispatch = useDispatch()

	const getPlaylistsData = async () => {
		setProgress(true)

		try {
			await GoogleSignin.hasPlayServices()
			await GoogleSignin.signIn()

			const { accessToken } = await GoogleSignin.getTokens()

			const { items } = await YTD('playlists', accessToken)

			return await Promise.all(
				items.map(async ({ id, snippet: { title } }) => {
					let list = await YTD('playlistItems', accessToken, { playlistId: id })

					list = await Promise.all(
						list.items.map(
							async ({
								snippet: {
									title,
									thumbnails: {
										default: { url: artwork }
									},
									resourceId: { videoId }
								}
							}) => {
								const filePath = `${RNFS.DocumentDirectoryPath}/${videoId}.mp3`

								return {
									title,
									artwork,
									videoId,
									exists: await RNFS.exists(filePath),
									source: `file:/${filePath}`
								}
							}
						)
					)

					return {
						id,
						title,
						list
					}
				})
			)
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (f.e. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened

				console.log(error)
			}
		} finally {
			setProgress(false)
		}
	}

	const setData = async () => {
		const playlist = await getPlaylistsData()

		dispatch(setList(playlist))

		await setPlaylist(playlist)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{items.length && items[index].title}</Text>
			<TouchableOpacity onPress={setData}>
				<View style={{ paddingHorizontal: 20 }}>
					{isProgress ? (
						<ActivityIndicator />
					) : (
						<ListDownload style={styles.icon} />
					)}
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = {
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		color: '#fff',
		fontSize: 30,
		padding: 20,
		flex: 1
	},
	icon: {
		width: 25,
		height: 25
	}
}
