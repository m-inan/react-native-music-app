import { Dimensions as RNDimensions, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const { width, height } = RNDimensions.get('window');

const topInset = initialWindowMetrics?.insets.top ?? 0;
const bottomInset = initialWindowMetrics?.insets.bottom ?? 0;

const THRESHOLD = 100;
const MINI_PLAYER_HEIGHT = 100;

const MINI_PLAYER_POS =
  height + (Platform.OS === 'ios' ? 0 : topInset) - MINI_PLAYER_HEIGHT;

export const Dimensions = {
  width,
  height,
  topInset,
  bottomInset,
  THRESHOLD,
  MINI_PLAYER_HEIGHT,
  MINI_PLAYER_POS,
};
