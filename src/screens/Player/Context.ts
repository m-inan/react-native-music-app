import { createContext, useContext } from 'react';
import Animated from 'react-native-reanimated';

type ContextType = {
  percent: Animated.SharedValue<number>;
};

export const Context = createContext({} as ContextType);

export const useAnimation = () => {
  return useContext(Context);
};
