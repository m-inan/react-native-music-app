import { Dimensions } from 'src/constants';

const { width, height } = Dimensions;

// in order to give compatible lengths and widths for
// longer and shorter screens
export const ratio = height / width;
// devices with less height to width ratio like iPhone 6, 7, SE..
export const minDeviceRatio = ratio < 1.8;
export const sliderRatio = minDeviceRatio ? 1.3 : 1.25;
export const sliderHeight = width / sliderRatio / 1.6;
