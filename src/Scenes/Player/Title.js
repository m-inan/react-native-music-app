import React, { useState, useContext, useMemo, useRef, useEffect } from 'react'
import { Animated, Text, Dimensions } from 'react-native'
import { Context } from '../../Stores'

const { width } = Dimensions.get('window')

export default function Title ({ positionY, miniPos }) {
  const [textWidth, setTextWidth] = useState(0)
  const [change, setChange] = useState(true)
  const { state } = useContext(Context)

  const { track } = useMemo(() => state.Player, [ state.Player ])

  useEffect(() => {
    setChange(true)
  }, [state.track])

  const top = positionY.interpolate({
    inputRange: [0, miniPos],
    outputRange: [(miniPos / 2) + 150, 30]
  })
  
  const right = positionY.interpolate({
    inputRange: [0, miniPos],
    outputRange: [(width - textWidth) / 2, 120]
  })

  return <Animated.View
    style={{
      top,
      right,
      ...styles.container,
    }}
    onLayout={({ nativeEvent: { layout } }) => {
      if ( change ) {

        setChange(false)
        setTextWidth(layout.width)
      }
    }}
  >
    <Text style={styles.title}>{ track ? track.title : 'Not Playing' }</Text>
    <Text style={styles.singer}>{ track && track.artist }</Text>
  </Animated.View>
}

const styles = {
  container: {
    flex: 1,
    alignSelf: 'flex-end',
    minWidth: 'auto',
    alignItems: 'center',
    position: 'absolute'
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  singer: {
    color: '#fff',
    fontSize: 12
  }
}