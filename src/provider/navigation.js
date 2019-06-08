import { Navigation } from 'react-native-navigation'
import withProvider from './withProvider'

import Auth from '../scenes/Auth'
import Playlist from '../scenes/Playlist'
import Player from '../scenes/Player'

import { getToken } from '../utils'

export default async function Navigator(store) {
  Navigation.registerComponent('Auth', () => withProvider(Auth, store))
  Navigation.registerComponent('Home', () => withProvider(Playlist, store))
  Navigation.registerComponent('Player', () => withProvider(Player, store))

  Navigation.setDefaultOptions({
    topBar: {
      visible: false
    },
    layout: {
      backgroundColor: 'rgb(52, 58, 64)',
      orientation: ['portrait']
    }
  })

  Navigation.showOverlay({
    component: {
      name: 'Player'
    }
  })

  const token = await getToken()

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home' //token ? 'Search' : 'Auth'
            }
          }
        ]
      }
    }
  })
}
