/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { App } from './src';
import { name as appName } from './app.json';

import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => require('./service.js'));
