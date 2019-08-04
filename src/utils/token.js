import AsyncStorage from '@react-native-community/async-storage'

const key = '@App:token'

export async function setToken(value) {
	await AsyncStorage.setItem(key, value)
}

export async function getToken() {
	return await AsyncStorage.getItem(key)
}

export async function removeToken() {
	return await AsyncStorage.removeItem(key)
}
