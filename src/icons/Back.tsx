import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './interfaces';

export const Back: React.FC<IconProps> = ({
  size = 30,
  fill = 'rgb(255, 255, 255)',
}: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 61 99">
      <Path
        d="M59.0866 84.1655L24.2095 49.8394L58.5621 14.8583C60.7911 12.762 60.9222 10.1417 58.9555 7.65244L52.793 1.62573C48.7283 -1.91168 46.3682 1.23269 45.0571 2.54284L2.70631 45.2539C-0.702755 48.3982 -1.09609 51.2806 2.70631 54.556L45.9749 97.005C47.9417 98.9702 50.6951 100.28 53.973 97.005L59.3488 91.5023C61.8401 89.144 61.3156 86.3927 59.0866 84.1655Z"
        fill={fill}
      />
    </Svg>
  );
};
