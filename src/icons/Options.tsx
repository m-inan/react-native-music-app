import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './interfaces';

export const Options: React.FC<IconProps> = ({
  size = 30,
  fill = 'rgb(255, 255, 255)',
}: IconProps) => {
  return (
    <Svg width={size} height={size} fill={fill} viewBox="0 0 12 58">
      <Path d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z" />
      <Path d="M12 29C12 32.3137 9.31371 35 6 35C2.68629 35 0 32.3137 0 29C0 25.6863 2.68629 23 6 23C9.31371 23 12 25.6863 12 29Z" />
      <Path d="M12 52C12 55.3137 9.31371 58 6 58C2.68629 58 0 55.3137 0 52C0 48.6863 2.68629 46 6 46C9.31371 46 12 48.6863 12 52Z" />
    </Svg>
  );
};
