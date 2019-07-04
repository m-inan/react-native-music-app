import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { Menu, Search } from '../Icons'

export default function Header() {
	const onPressSearch = () => {}

	return (
		<View style={styles.container}>
			<Menu />

			<TouchableWithoutFeedback onPress={onPressSearch}>
				<View style={styles.search}>
					<Search />
				</View>
			</TouchableWithoutFeedback>
		</View>
	)
}

const styles = {
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 15,
		paddingTop: 20,
		height: 70
	},

	search: {
		marginLeft: 'auto',
		padding: 15
	}
}
