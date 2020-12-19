import { Dimensions as RNDimensions } from 'react-native';

const { width, height } = RNDimensions.get('window');

export const Dimensions = {
  width,
  height,
  MINI_PLAYER_HEIGHT: 100,
};
