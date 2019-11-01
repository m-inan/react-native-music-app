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
import { useSelector, useDispatch } from 'react-redux'
import RNFS from 'react-native-fs'

import { Api } from 'constants'
import {
	setFileLoading,
	setAudioFileExists,
	multipleDownloadLoading
} from 'reducers/Playlist/actions'

import Item from './Item'
import Title from './Title'

import { Colors } from 'constants'
import { Download } from 'components/Icons'

const { width } = Dimensions.get('window'),
	padding = 40

export default function Lists() {
	const dispatch = useDispatch()
	const { items } = useSelector(state => state.Playlist)
	const [index, setIndex] = useState(0)

	const _onPressTabButton = async key => {
		setIndex(key)
	}

	const _multipleDownloadList = async () => {
		let { id, list } = items[index]

		dispatch(multipleDownloadLoading(id, true))

		list = list.filter(item => !item.exists)

		list.map(({ videoId }) => dispatch(setFileLoading(videoId, true)))

		for (const item of list) {
			const { videoId } = item
			const toFile = `${RNFS.DocumentDirectoryPath}/${videoId}.mp3`

			const response = await fetch(`${Api.SERVICE_URL}/download/${videoId}`)
			const { audio: fromUrl } = await response.json()

			const { promise } = RNFS.downloadFile({
				fromUrl,
				toFile
			})

			try {
				await promise

				dispatch(setAudioFileExists(id, videoId))
			} catch (error) {
				console.log(error)
			} finally {
				dispatch(setFileLoading(videoId, false))
			}
		}

		dispatch(multipleDownloadLoading(id, false))
	}

	const Songs = () => {
		if (!items.length) return null

		const { id, list, loading } = items[index]

		const exists = list.filter(item => item.exists).length,
			notExists = list.length - exists

		const showMultilple = notExists > exists

		return (
			<View style={styles.scene}>
				<FlatList
					data={list}
					keyExtractor={({ videoId }) => videoId}
					renderItem={({ item }) => <Item playlistId={id} {...item} />}
				/>
				{showMultilple && (
					<TouchableOpacity
						style={styles.multipleDownload}
						onPress={_multipleDownloadList}
					>
						<Download />
					</TouchableOpacity>
				)}
				{loading && (
					<React.Fragment>
						<View style={styles.loadingBackward} />

						<View style={styles.multipleLoading}>
							<View style={styles.multilpleProgress}>
								<View
									style={[
										styles.ProgressBar,
										{
											width: `${(exists / list.length) * 100}%`
										}
									]}
								/>
							</View>

							<Text style={{ color: 'white' }}>
								{exists} / {list.length}
							</Text>
						</View>
					</React.Fragment>
				)}
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
	},
	multipleDownload: {
		position: 'absolute',
		bottom: 30,
		right: -15,
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: Colors.primary,
		padding: 10
	},
	multipleLoading: {
		position: 'absolute',
		width: 200,
		height: 90,
		left: (width - padding) / 2 - 100,
		top: 100,
		backgroundColor: Colors.layoutBG,
		zIndex: 999,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	multilpleProgress: {
		flex: 1,
		marginRight: 10
	},
	ProgressBar: {
		backgroundColor: Colors.primary,
		height: 2
	},
	loadingBackward: {
		position: 'absolute',
		zIndex: 998,
		backgroundColor: 'rgba(0,0,0,.3)',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0
	}
})
