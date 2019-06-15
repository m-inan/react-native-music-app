import { Navigation } from 'react-native-navigation'

import Provider from './provider'

export default function App() {
	Navigation.events().registerAppLaunchedListener(() => {
		Provider()
	})
}
