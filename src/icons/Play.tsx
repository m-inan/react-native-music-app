import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './interfaces';

export const Play: React.FC<IconProps> = ({
  size = 30,
  fill = 'rgb(255, 255, 255)',
}: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 500 500">
      <Path
        d="M448.53,185.3,133.07,8.49C39.55-23.15,31.22,68.22,31.22,68.22S30,356.2,30,427.16s68.82,91.66,140.57,48.78S448.53,311.55,448.53,311.55C496.73,278.14,496.43,216.94,448.53,185.3ZM112.64,411.19V85.36L395.3,250Z"
        fill={fill}
      />
    </Svg>
  );
};
