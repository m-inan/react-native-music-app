import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

import { IconProps } from './interfaces';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props extends IconProps {
  opacity: Animated.SharedValue<number>;
}

export const Previous: React.FC<Props> = ({
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
        d="M466.77,499.93l.68-181.11L761.77,490.55c93.62,31.35,101.67-60,101.67-60s.32-288,.11-358.94-69.1-91.45-140.72-48.36S463.9,186.66,463.9,186.66L463-.06,399.77.13l.21,500ZM781,87.78l1,325.83L498.81,249.83Z"
        fill={fill}
      />
      <AnimatedPath
        d="M399.83,88.21,399.56-.13S82.54,176.1,62.47,188.58c-40.14,23.18-64.18,88.3.39,127.13L401.08,500.13,400.82,417,117.66,250.86Z"
        fill={'gray'}
        animatedProps={animatedProps}
      />
    </Svg>
  );
};
