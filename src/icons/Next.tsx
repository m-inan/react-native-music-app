import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

import { IconProps } from './interfaces';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props extends IconProps {
  opacity: Animated.SharedValue<number>;
}

export const Next: React.FC<Props> = ({
  size = 30,
  opacity,
  fill = 'rgb(255, 255, 255)',
}: Props) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Svg width={size} height={size} viewBox="0 0 870 500">
      <Path
        d="M421.25-.29l-1.43,181.11L126.21,7.89C32.72-23.85,24.29,67.5,24.29,67.5s-1.51,288-1.58,358.94,68.72,91.73,140.52,48.94S422.82,313,422.82,313l.12,186.72,63.25.06L488-.21ZM105.34,410.56l.36-325.82L388.18,249.68Z"
        fill={fill}
      />
      <AnimatedPath
        d="M486.5,411.71l-.1,88.34S804.14,325.12,824.26,312.73c40.23-23,64.55-88,.13-127.14L486.94-.22l-.09,83.14,282.48,167.3Z"
        fill={'gray'}
        animatedProps={animatedProps}
      />
    </Svg>
  );
};
