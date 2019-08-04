import { Animated, PanResponder, Dimensions } from 'react-native'

let { height } = Dimensions.get('window')
export const miniPos = height - 100

export const positionY = new Animated.Value(miniPos)

let startLoc,
	startPage,
	isOpen = false

export const _panResponder = PanResponder.create({
	onStartShouldSetPanResponder: () => true,
	onStartShouldSetPanResponderCapture: ({
		nativeEvent: { pageY, locationY }
	}) => {
		// start
		startLoc = locationY
		startPage = pageY
	},
	onPanResponderRelease: ({ nativeEvent: { pageY, pageX } }) => {
		// finish
		if (isOpen && startPage + 30 < pageY) {
			pageY = miniPos
		} else if (startPage > pageY + 30) {
			pageY = 0
		} else {
			if ((pageY < 50 && pageX < 50) || pageY > height / 2) {
				pageY = miniPos
			} else {
				pageY = 0
			}
		}

		isOpen = pageY === 0

		Animated.timing(positionY, {
			toValue: pageY,
			duration: 300
		}).start()
	},
	onMoveShouldSetPanResponder: () => true,
	onMoveShouldSetPanResponderCapture: () => true,
	onPanResponderMove: ({ nativeEvent: { pageY } }) => {
		pageY -= startLoc

		if (pageY > miniPos) {
			pageY = miniPos
		} else if (pageY < 0) {
			pageY = 0
		}

		Animated.timing(positionY, {
			toValue: pageY,
			duration: 0
		}).start()
	}
})
