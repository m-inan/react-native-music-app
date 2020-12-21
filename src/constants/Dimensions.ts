import { Dimensions as RNDimensions } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const { width, height } = RNDimensions.get('window');

const topInset = initialWindowMetrics?.insets.top ?? 0;
const bottomInset = initialWindowMetrics?.insets.bottom ?? 0;

export const Dimensions = {
  width,
  height,
  topInset,
  bottomInset,
  MINI_PLAYER_HEIGHT: 100,
};
