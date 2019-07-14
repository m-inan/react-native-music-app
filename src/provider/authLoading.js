import React, { useEffect } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'

import { getToken, removeToken } from '../utils'
import { Colors } from '../constants'
import { GoogleSignin } from 'react-native-google-signin'

export default function authLoading({ navigation }) {
	const _bootstrapAsync = async () => {
		const userToken = await getToken()

		navigation.navigate(userToken ? 'Home' : 'Auth')
	}

	useEffect(() => {
		_bootstrapAsync()
	}, [])

	return (
		<View style={styles.container}>
			<ActivityIndicator />
			<StatusBar barStyle="default" />
		</View>
	)
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.layoutBG
	}
}
