import React from 'react'
import { Dimensions, Animated } from 'react-native'

import Title from './Title'
import Header from './Header'
import Slider from './Slider'
import Record from './Record'
import Handle from './Handle'
import Controllers from './Controllers'

import { _panResponder, positionY, miniPos } from './Animation'

const { width, height } = Dimensions.get('window')

export default function Player() {
  const animation = {
    miniPos,
    positionY
  }

  return (
    <Animated.View style={styles.container}>
      <Header {...animation} />
      <Slider {...animation} />
      <Record {...animation} />
      <Title {...animation} />
      <Controllers />
      <Handle {...animation} {..._panResponder.panHandlers} />
    </Animated.View>
  )
}

const styles = {
  container: {
    width,
    height,
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: 'rgb(35, 40, 44)',
    transform: [{ translateY: positionY }]
  }
}
