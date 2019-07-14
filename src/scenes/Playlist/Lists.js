import React, { useState } from 'react'
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ScrollView,
	Dimensions,
	TouchableOpacity
} from 'react-native'
import { useSelector } from 'react-redux'

import TabView from '../../components/TabView'

import Item from './Item'
import Title from './Title'

import { Colors } from '../../constants'

const padding = 40
const { width } = Dimensions.get('window')

export default function Lists() {
	const items = useSelector(state => state.Playlist)

	return (
		<View style={styles.container}>
			<TabView
				TabBar={({ _onPressTabButton, _measureTab, index }) => (
					<View style={styles.tabBar}>
						{items.map((item, key) => {
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
										{item.title}
									</Text>
								</TouchableOpacity>
							)
						})}
					</View>
				)}
				Screens={() =>
					items.map((scene, key) => (
						<View key={key} style={styles.scene}>
							<ScrollView>
								<FlatList
									data={scene.list}
									keyExtractor={({ videoId }) => videoId}
									renderItem={Item}
								/>
							</ScrollView>
						</View>
					))
				}
				Title={({ index }) => <Title {...{ index, items }} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 50
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
	}
})
