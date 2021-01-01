import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './interfaces';

export const Pause: React.FC<IconProps> = ({
  size = 30,
  fill = 'rgb(255, 255, 255)',
}: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 61 84">
      <Path
        d="M0 2.52C0 1.12824 1.15397 0 2.57746 0H13.7465C15.17 0 16.3239 1.12824 16.3239 2.52V81.48C16.3239 82.8718 15.17 84 13.7465 84H2.57746C1.15397 84 0 82.8718 0 81.48V2.52Z"
        fill={fill}
      />
      <Path
        d="M44.6761 2.52C44.6761 1.12824 45.83 0 47.2535 0H58.4225C59.846 0 61 1.12824 61 2.52V81.48C61 82.8718 59.846 84 58.4225 84H47.2535C45.83 84 44.6761 82.8718 44.6761 81.48V2.52Z"
        fill={fill}
      />
    </Svg>
  );
};
