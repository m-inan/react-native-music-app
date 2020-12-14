import React, { useState, useEffect } from 'react';

import { Context } from './Context';

interface Props {
  children: React.ReactNode;
}

export const PlayerProvider: React.FC<Props> = ({ children }: Props) => {
  const [isReady, setReady] = useState<boolean>(false);
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
    setPlaying(true);
  }, []);

  return (
    <Context.Provider value={{ isReady, isPlaying }}>
      {children}
    </Context.Provider>
  );
};

export { usePlayerContext } from './Context';
