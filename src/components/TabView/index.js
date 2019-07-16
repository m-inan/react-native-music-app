import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'

import { Colors } from '../../constants'

const { width } = Dimensions.get('window')

let scrollView, tabBarScroll
const _tabsMeasurements = []

export default function TabView({ TabBar, Screens, Title }) {
	const [index, setIndex] = useState(0)

	const _onMomentumScrollBeginAndEnd = ({
		nativeEvent: {
			contentOffset: { x }
		}
	}) => {
		const page = Math.round(x / width)

		setIndex(page)
		_updateTabBarScroll(page)
	}

	const _onPressTabButton = key => {
		setIndex(key)
		_updateTabBarScroll(key)

		scrollView.scrollTo({ x: key * width, y: 0, animated: true })
	}

	const _updateTabBarScroll = key => {
		let scrollX = 0

		_tabsMeasurements.map(({ width }, k) => {
			if (k < key) {
				scrollX += width
			}
		})
		tabBarScroll.scrollTo({ x: scrollX - width / 3 })
	}

	const _measureTab = (
		key,
		{
			nativeEvent: {
				layout: { x, width, height }
			}
		}
	) => {
		_tabsMeasurements[key] = { left: x, right: x + width, width, height }
	}

	return (
		<View style={styles.container}>
			<Title index={index} />

			<View style={styles.tabBarContainer}>
				<ScrollView
					horizontal
					ref={scView => (tabBarScroll = scView)}
					showsHorizontalScrollIndicator={false}
				>
					<TabBar {...{ _measureTab, index, _onPressTabButton }} />
				</ScrollView>
			</View>

			<View style={styles.sceneContainer}>
				<ScrollView
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					ref={scView => (scrollView = scView)}
					onMomentumScrollEnd={_onMomentumScrollBeginAndEnd}
				>
					<Screens {...{ index }} />
				</ScrollView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	tabBarContainer: {
		height: 100,
		backgroundColor: Colors.primary
	},
	sceneContainer: {
		top: -50,
		flex: 1
	}
})
