import { createContext, useContext } from 'react';
import { Animated } from 'react-native';

type ContextType = {
  translateY: Animated.Value;
};

export const Context = createContext<ContextType>({} as ContextType);

export const useBottomSheet = () => {
  const context = useContext(Context);

  return context;
};