import React, { useEffect } from 'react'
import { View } from 'react-native'

import Layout from '../../components/Layout'
import { Colors } from '../../constants'
import { YTD } from '../../utils'
import Lists from './Lists'

const getPlaylists = async () => {
	try {
		const { items } = await YTD('playlists')
		console.log(items)

		for (const item of items) {
			const list = await YTD('playlistItems', { playlistId: item.id })

			console.log(list)
		}
	} catch (e) {
		console.log(e)
	}
}

export default function Playlist() {
	useEffect(() => {
		getPlaylists()
	}, [])

	return (
		<Layout>
			<View style={styles.container}>
				<Lists />
			</View>
		</Layout>
	)
}

const styles = {
	container: { flex: 1, backgroundColor: Colors.layoutBG }
}
