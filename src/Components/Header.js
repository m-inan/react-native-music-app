import React from 'react'
import { View } from 'react-native'
import { Music, Menu, Search } from '../Icons'


export function Header () {
  return (
    <View style={styles.container}>
      <Menu />

      <Search style={styles.search}/>
    </View>
  )
}


const styles = {
  container: {
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 15,
  },

  search: {
    marginLeft: 'auto'
  }
}