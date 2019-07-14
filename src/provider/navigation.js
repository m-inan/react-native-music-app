import { createStackNavigator, createAppContainer } from 'react-navigation'

import Playlist from '../scenes/Playlist'
import Auth from '../scenes/Auth'

import AuthLoading from './authLoading'

const AppNavigator = createStackNavigator(
	{
		AuthLoading: {
			screen: AuthLoading
		},
		Home: {
			screen: Playlist
		},
		Auth: {
			screen: Auth
		}
	},
	{
		defaultNavigationOptions: {
			header: null
		},
		initialRouteName: 'AuthLoading'
	}
)

export default createAppContainer(AppNavigator)
