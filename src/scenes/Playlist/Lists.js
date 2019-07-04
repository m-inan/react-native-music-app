import React, { useState } from 'react'
import {
	View,
	Text,
	ListView,
	StyleSheet,
	ScrollView,
	Dimensions,
	TouchableOpacity
} from 'react-native'

import { Colors } from '../../constants'

const scenes = [
	{ title: 'First' },
	{ title: 'Second' },
	{ title: 'Third' },
	{ title: 'ZZZZZZFirstZZZZZZ' },
	{ title: 'Second' },
	{ title: 'Third' },
	{ title: 'First' },
	{ title: 'Second' },
	{ title: 'ZZZZZZFirstZZZZZZ' },
	{ title: 'Third' }
]

const data = [
	{ name: 'Song Name' },
	{ name: 'Song Name' },
	{ name: 'Song Name' },
	{ name: 'Song Name' },
	{ name: 'Song Name' },
	{ name: 'Song Name' },
	{ name: 'Song Name' },
	{ name: 'Song Name' },
	{ name: 'Song Name' },
	{ name: 'Song Name' }
]

const padding = 40
const { width } = Dimensions.get('window')
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

let scrollView, tabBarScroll
const _tabsMeasurements = []

export default function Lists() {
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
			<Text style={styles.title}>{scenes[index].title}</Text>

			<View style={styles.tabBarContainer}>
				<ScrollView
					horizontal
					ref={scView => (tabBarScroll = scView)}
					showsHorizontalScrollIndicator={false}
				>
					<View style={styles.tabBar}>
						{scenes.map((scene, key) => {
							const isActive = key === index

							return (
								<TouchableOpacity
									key={key}
									onPress={_onPressTabButton.bind(this, key)}
								>
									<Text
										style={{
											fontSize: isActive ? 16 : 14,
											color: isActive ? Colors.white : Colors.lightGray,
											paddingRight: 20
										}}
										onLayout={_measureTab.bind(this, key)}
									>
										{scene.title}
									</Text>
								</TouchableOpacity>
							)
						})}
					</View>
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
					{scenes.map((scene, key) => (
						<View key={key} style={styles.scene}>
							<ScrollView>
								<ListView
									dataSource={ds.cloneWithRows(data)}
									renderRow={item => (
										<View style={styles.item}>
											<Text style={{ color: Colors.gray }}>{item.name}</Text>
										</View>
									)}
								/>
							</ScrollView>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		color: '#fff',
		fontSize: 30,
		padding: 20
	},
	container: {
		flex: 1,
		marginBottom: 50
	},
	tabBarContainer: {
		height: 100,
		backgroundColor: Colors.primary
	},
	scene: {
		width: width - padding,
		flex: 1,
		backgroundColor: Colors.playerBG,
		marginHorizontal: padding / 2
	},
	tabBar: {
		flexDirection: 'row',
		paddingHorizontal: padding / 2,
		alignItems: 'center',
		height: 30
	},
	sceneContainer: {
		top: -50,
		flex: 1
	},
	item: {
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray,
		padding: 10
	}
})
