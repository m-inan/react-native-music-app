import { createStackNavigator, createAppContainer } from 'react-navigation'
import Playlist from '../scenes/Playlist'
import Header from '../components/Header'

const AppNavigator = createStackNavigator(
	{
		Home: {
			screen: Playlist
		}
	},
	{
		defaultNavigationOptions: {
			header: Header
		}
	}
)

export default createAppContainer(AppNavigator)
