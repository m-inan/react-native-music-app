import AsyncStorage from '@react-native-community/async-storage'

const key = '@App:playlist'

export async function setPlaylist(value) {
	return await AsyncStorage.setItem(key, JSON.stringify(value))
}

export async function getPlaylist() {
	const playlist = JSON.parse(await AsyncStorage.getItem(key))

	return playlist || []
}
