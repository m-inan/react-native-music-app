import { createContext, useContext } from 'react';
import { Animated } from 'react-native';

type Snap = {
  top: number;
  middle: number;
  bottom: number;
};

type ContextType = {
  snap: Snap;
  position: Animated.Value;
  interpolate: (
    inputRange: number[],
    outputRange: string[] | number[],
  ) => Animated.AnimatedInterpolation;
};

export const Context = createContext<ContextType>({} as ContextType);

export const useBottomSheet = () => {
  const context = useContext(Context);

  return context;
};
