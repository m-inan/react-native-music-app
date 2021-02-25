import { Dimensions, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

let { width, height } = Dimensions.get('window');

// safeareaview (IphoneX, later or Samsung One UI) for
// top and bottom insets
const TOP_INSET = initialWindowMetrics?.insets.top ?? 0;
const BOTTOM_INSET = initialWindowMetrics?.insets.bottom ?? 0;

// fix android height value
if (Platform.OS === 'android') {
  height += TOP_INSET;
}

// devices with less height to width ratio like iPhone 6, 7, SE..
const deviceRatio = width / height;

const WIDTH = width;
const HEIGHT = height;

const HEADER_HEIGHT = 80;
const HANDLE_HEIGHT = HEADER_HEIGHT + TOP_INSET;

const MINI_HEIGHT = 85;
const MINI_AREA_HEIGHT = MINI_HEIGHT + BOTTOM_INSET;

const SNAP_TOP = 0;
const SNAP_BOTTOM = HEIGHT - MINI_AREA_HEIGHT;

const SECTION_RATIO = deviceRatio < 0.5 ? 0.8 : 0.75;
const SECTION_HEIGHT = WIDTH * SECTION_RATIO;

const SLIDER_RATIO = 0.65 * SECTION_RATIO;
const SLIDER_HEIGHT = WIDTH * SLIDER_RATIO;

const MINI_CONTROL_WIDTH = 120;

export {
  WIDTH,
  HEIGHT,
  SNAP_TOP,
  TOP_INSET,
  SNAP_BOTTOM,
  MINI_HEIGHT,
  BOTTOM_INSET,
  HEADER_HEIGHT,
  HANDLE_HEIGHT,
  SECTION_HEIGHT,
  SLIDER_HEIGHT,
  MINI_AREA_HEIGHT,
  MINI_CONTROL_WIDTH,
};
