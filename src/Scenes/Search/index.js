import React, { useContext } from 'react'
import { View, Button } from 'react-native'

import { Context } from '../../Stores'
import { toggle } from '../../Stores/Search/actions'

export default function Search () {
  const { state: { Search }, dispatch } = useContext(Context)



  if ( !Search.show ) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button title="close" onPress={() => dispatch(toggle())} />
    </View>
  )
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    zIndex: 9,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}