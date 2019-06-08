import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dimensions, PanResponder, View, Animated, Text } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import Svg, { Circle, G, Path } from 'react-native-svg'
import {
  timeFormat,
  polarToCartesian,
  cartesianToPolar
} from '../../utils/index'

const { width } = Dimensions.get('window')
const padding = 20
const r = (width - padding * 2) / 2
const cx = r + padding
const cy = padding
const height = (width + padding * 2) / 2

function Slider({ positionY, miniPos, Player }) {
  const [percent, setPercent] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (Player.time > 0) {
      setPercent((Player.time * 100) / Player.duration)
    }

    setTime(Player.time)
  }, [Player.time])

  useEffect(() => {
    if (Player.state === 'ready') {
      setPercent(0)
    }
  }, [Player.state])

  const setProgress = (x, y) => {
    //if ( !Player.track ) return;

    const angleToPercent = (cartesianToPolar(x, y, { cy, cx }) / 180) * 100
    const time = (Player.duration / 100) * angleToPercent

    TrackPlayer.seekTo(time)

    setTime(time)
    setPercent(angleToPercent)

    return true
  }

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => {
      // start
      TrackPlayer.pause()
    },
    onPanResponderRelease: () => {
      // end
      if (Player.isPlaying) {
        TrackPlayer.play()
      }
    },
    onPanResponderGrant: ({ nativeEvent: { locationX, locationY } }) =>
      setProgress(locationX, locationY),
    onPanResponderMove: ({ nativeEvent: { locationX, locationY } }) =>
      setProgress(locationX, locationY)
  })

  const { x, y } = polarToCartesian((percent * 180) / 100, { cy, cx, r })

  return (
    <Animated.View
      style={{
        opacity: positionY.interpolate({
          inputRange: [0, miniPos / 2, miniPos],
          outputRange: [1, 0, 0]
        }),
        ...styles.container
      }}
    >
      <Text numberOfLines={1} style={styles.current}>
        {timeFormat(time)}
      </Text>

      <Text numberOfLines={1} style={styles.duration}>
        {timeFormat(Player.duration)}
      </Text>

      <View>
        <Svg width={'100%'} height={'100%'}>
          <G {..._panResponder.panHandlers}>
            <Path
              fill="none"
              stroke={'rgb(131, 141, 149)'}
              strokeWidth={5}
              d={`M${padding} ${cy} A ${r} ${r} 0 0 0 ${r * 2 + padding} ${cy}`}
            />

            <Path
              fill="none"
              strokeWidth={5}
              stroke={'rgb(225, 47, 129)'}
              d={`M${padding} ${cy} A ${r} ${r} 0 0 0 ${x} ${y}`}
            />

            <Circle
              cx="0"
              cy="0"
              r={10}
              x={Math.abs(x)}
              y={Math.abs(y)}
              fill="rgb(225, 47, 129)"
            />
          </G>

          <Circle
            r={r - 30}
            fill="none"
            strokeWidth="2"
            cx={r + padding}
            cy={padding}
          />
        </Svg>
      </View>
    </Animated.View>
  )
}

const styles = {
  container: {
    position: 'relative',
    top: 220,
    height,
    zIndex: 3
  },

  current: {
    top: -10,
    left: 0,
    width: padding * 2,
    position: 'absolute',
    color: '#ddd',
    textAlign: 'center',
    fontSize: 12
  },

  duration: {
    top: -10,
    right: 0,
    width: padding * 2,
    position: 'absolute',
    color: '#ddd',
    textAlign: 'center',
    fontSize: 12
  }
}

export default connect(state => state)(Slider)
