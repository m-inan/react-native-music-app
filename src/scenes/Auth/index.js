import React, { useState } from 'react'
import { View } from 'react-native'
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes
} from 'react-native-google-signin'

GoogleSignin.configure({
	scopes: ['https://www.googleapis.com/auth/youtube.readonly']
})

export default function Auth(props) {
	const [isProgress, setProgress] = useState(false)

	const signIn = async () => {
		setProgress(true)

		try {
			await GoogleSignin.hasPlayServices()
			const userInfo = await GoogleSignin.signIn()

			console.log(userInfo)
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

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},

	button: {
		width: 192,
		height: 48
	}
}
