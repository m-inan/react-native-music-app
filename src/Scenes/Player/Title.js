import React, { useState, useContext, useMemo, useRef, useEffect } from 'react'
import { Animated, Text, Dimensions } from 'react-native'
import { Context } from '../../Stores'


export default function Title ({ positionY, miniPos }) {
  const [textWidth, setTextWidth] = useState(0)
  const { state } = useContext(Context)
  const layout = useRef(null)


  useEffect(() => {
    layout.current.onLayout = () => {
      console.log('layout')
    }
  }, [])


  const { track } = useMemo(() => state.Player, [ state.Player ])

  const top = positionY.interpolate({
    inputRange: [0, miniPos],
    outputRange: [(miniPos / 2) + 150, 30]
  })

  const right = positionY.interpolate({
    inputRange: [0, miniPos],
    outputRange: [0, 120]
  })

  return <Animated.View
    ref={layout}
    style={{
      top,
      right,
      ...styles.container,
    }}
  >
    <Text style={styles.title}>{ track ? track.title : 'Not Playing' }</Text>
    <Text style={styles.singer}>{ track && track.artist }</Text>
  </Animated.View>
}

const styles = {
  container: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'flex-end',
    minWidth: 'auto',
    alignItems: 'flex-end',
    width: '100%',
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  singer: {
    color: '#fff',
    fontSize: 12
  }
}