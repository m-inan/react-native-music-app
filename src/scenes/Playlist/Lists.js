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
import { useDispatch, useSelector } from 'react-redux'

import { setActiveList } from '../../reducers/Playlist/actions'

import Item from './Item'
import Title from './Title'

import { Colors } from '../../constants'

const { width } = Dimensions.get('window'),
	padding = 40

export default function Lists() {
	const dispatch = useDispatch()
	const items = useSelector(state => state.Playlist)

	const [index, setIndex] = useState(0)

	const _onPressTabButton = async key => {
		dispatch(setActiveList(items[key]))

		setIndex(key)
	}

	const Songs = () => {
		if (!items.length) return null

		const scene = items[index]

		return (
			<View style={styles.scene}>
				<FlatList
					data={scene.list}
					keyExtractor={({ videoId }) => videoId}
					renderItem={({ item }) => <Item playlistId={scene.id} {...item} />}
				/>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Title {...{ index, items }} />

			<View style={styles.tabBarContainer}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<View style={styles.tabBar}>
						{items.map(({ title }, key) => {
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
									>
										{title}
									</Text>
								</TouchableOpacity>
							)
						})}
					</View>
				</ScrollView>
			</View>

			<View style={styles.sceneContainer}>{Songs()}</View>
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
