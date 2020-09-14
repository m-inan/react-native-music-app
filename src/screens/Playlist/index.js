import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'

import Layout from 'components/Layout'
import Lists from './Lists'

import { Colors } from 'constants'
import { setList } from 'reducers/Playlist/actions'
import { playlist, sounds } from '../../../data'

export default function Playlist() {
	const dispatch = useDispatch()

	useEffect(() => {
		setReduxData()
	}, [])

	const setReduxData = async () => {
		// simulate relational database
		dispatch(
			setList(
				playlist.map(list => ({
					...list,
					sounds: list.items.map(item => {
						const sound = sounds.find(sound => sound.id === item)

						return {
							...sound,
							id: String(sound.id)
						}
					})
				}))
			)
		)
	}

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
