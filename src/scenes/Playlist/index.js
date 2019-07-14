import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import Layout from '../../components/Layout'
import Lists from './Lists'

import { Colors } from '../../constants'
import { setList } from '../../reducers/Playlist/actions'

export default function Playlist() {
	const dispatch = useDispatch()

	useEffect(() => {
		setReduxData()
	}, [])

	const setReduxData = async () => {
		const playlist = await AsyncStorage.getItem('playlist')

		dispatch(setList(JSON.parse(playlist)))
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
