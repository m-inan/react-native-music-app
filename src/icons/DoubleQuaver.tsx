import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './interfaces';

export const DoubleQuaver: React.FC<IconProps> = ({
  size = 30,
  fill = 'rgb(255, 255, 255)',
}: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 50">
      <Path
        d="M5.45558 49.5525C-6.14761 44.1858 2.88694 28.8012 12.8072 35.4202V11.1806L43.9853 0V35.4202C44.3396 42.9335 38.2279 44.7217 34.5964 44.0963C23.1704 42.1285 27.9534 22.719 40.2651 29.3379V10.2862C40.2651 9.12337 39.1497 7.87115 37.5554 8.31837L15.9959 16.279V42.218C15.9073 48.9263 8.64424 51.0273 5.45558 49.5525Z"
        fill={fill}
      />
    </Svg>
  );
};
