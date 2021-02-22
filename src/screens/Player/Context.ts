import { createContext, useContext, MutableRefObject } from 'react';
import { Animated, View } from 'react-native';

type ContextType = {
  position: Animated.Value;
  percent: Animated.Value;
  status: Animated.Value;
  container: MutableRefObject<View | undefined>;
  range: (
    inputRange: string[] | number[],
    outputRange?: string[] | number[],
  ) => Animated.AnimatedInterpolation;
};

export const Context = createContext<ContextType>({} as ContextType);

export const useBottomSheet = () => {
  const context = useContext(Context);

  return context;
};
