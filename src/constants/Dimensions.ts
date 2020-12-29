import { Dimensions as RNDimensions, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

let { width, height } = RNDimensions.get('window');

// safeareaview (IphoneX, later or Samsung One UI) for
// top and bottom insets
const topInset = initialWindowMetrics?.insets.top ?? 0;
const bottomInset = initialWindowMetrics?.insets.bottom ?? 0;

// fix android height value
if (Platform.OS === 'android') {
  height += topInset;
}

// Player BottomSheet Threshold %10 percent of device height
const THRESHOLD = height / 10;
const MINI_PLAYER_HEIGHT = 100 + bottomInset / 2;

// player bottomsheet top and bottom position
const PLAYER_SNAP_TOP = 0;
const PLAYER_SNAP_BOTTOM = height - MINI_PLAYER_HEIGHT;

export const Dimensions = {
  width,
  height,
  topInset,
  bottomInset,
  THRESHOLD,
  PLAYER_SNAP_TOP,
  PLAYER_SNAP_BOTTOM,
  MINI_PLAYER_HEIGHT,
};
