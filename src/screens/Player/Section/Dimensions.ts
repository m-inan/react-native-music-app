import { Dimensions } from 'react-native';

const window = Dimensions.get('window');

const PI = Math.PI;
const ratio = 0.55;
const width = 100;
const height = width * ratio;

const padding = 6;
const circle = 4;
const r = height / 2;
const cx = width / 2;
const cy = padding - 1;
const centerX = window.width / 2;
const viewBox = `0 0 ${width} ${height}`;
const strokeDasharray = 141.33464427236564;
const d = `M${padding} ${cy} A ${r} ${r} 0 0 0 ${cx * 2 - padding} ${cy}`;

export {
  d,
  cx,
  cy,
  PI,
  width,
  circle,
  padding,
  centerX,
  viewBox,
  strokeDasharray,
};
