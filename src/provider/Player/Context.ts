import { createContext, useContext } from 'react';
import { ContextType } from './ContextType';

export const Context = createContext<ContextType>({} as ContextType);

export const usePlayerContext = () => {
  const context = useContext(Context);

  return context;
};
