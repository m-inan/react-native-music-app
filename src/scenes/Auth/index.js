import React, { useState } from 'react'
import { View } from 'react-native'
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes
} from 'react-native-google-signin'
import { Colors } from '../../constants'
import { setToken } from '../../utils'

GoogleSignin.configure({
	scopes: ['https://www.googleapis.com/auth/youtube.readonly']
})

export default function Auth({ navigation }) {
	const [isProgress, setProgress] = useState(false)

	const signIn = async () => {
		setProgress(true)

		try {
			await GoogleSignin.hasPlayServices()
			await GoogleSignin.signIn()

			const { accessToken } = await GoogleSignin.getTokens()

			setToken(accessToken)

			navigation.navigate('Home')
		} catch (error) {
			console.log(error)
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (f.e. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		} finally {
			setProgress(false)
		}
	}

	return (
		<View style={styles.container}>
			<GoogleSigninButton
				style={styles.button}
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={signIn}
				disabled={isProgress}
			/>
		</View>
	)
}

Auth.navigationOptions = {
	header: null
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		backgroundColor: Colors.layoutBG
	},

	button: {
		width: 192,
		height: 48
	}
}
