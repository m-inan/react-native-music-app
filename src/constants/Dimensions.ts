import { Dimensions as RNDimensions, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const { width, height } = RNDimensions.get('window');

// safeareaview (IphoneX, later or Samsung One UI) for
// top and bottom insets
const topInset = initialWindowMetrics?.insets.top ?? 0;
const bottomInset = initialWindowMetrics?.insets.bottom ?? 0;

// Player BottomSheet Threshold %10 percent of device height
const THRESHOLD = height / 10;
const MINI_PLAYER_HEIGHT = 100;

// player bottomsheet top and bottom position
const PLAYER_SNAP_TOP = 0;
const PLAYER_SNAP_BOTTOM =
  height + (Platform.OS === 'ios' ? 0 : topInset) - MINI_PLAYER_HEIGHT;

// in order to give compatible lengths and widths for
// longer and shorter screens
const ratio = height / width;
const minDeviceRatio = ratio < 1.8;
const sliderRatio = minDeviceRatio ? 1.3 : 1.2;

export const Dimensions = {
  width,
  height,
  topInset,
  bottomInset,
  ratio,
  minDeviceRatio,
  sliderRatio,
  THRESHOLD,
  PLAYER_SNAP_TOP,
  PLAYER_SNAP_BOTTOM,
  MINI_PLAYER_HEIGHT,
};
