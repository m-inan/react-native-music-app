import React, { useContext } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { Music, Menu, Search } from '../Icons'

import { Context } from '../Stores'
import { toggle } from "../Stores/Search/actions";

export function Header () {
  const { dispatch } = useContext(Context)

  const onPressSearch = () => {
    dispatch(toggle())
  }

  return (
    <View style={styles.container}>
      <Menu />

      <TouchableWithoutFeedback onPress={onPressSearch}>
        <View style={styles.search}>
          <Search/>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = {
  container: {
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 15,
  },

  search: {
    marginLeft: 'auto',
    padding: 15,
  }
}