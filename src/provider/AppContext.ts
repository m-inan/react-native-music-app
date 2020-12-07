import { createContext, useContext } from 'react';
import { ContextType } from './ContexType';
import { InitialValue } from './InitialValue';

export const AppContext = createContext<ContextType>(InitialValue);

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};
