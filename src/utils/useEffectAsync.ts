import { useEffect } from 'react';

//TODO RICHARD - impro typing
export const useEffectAsync = (effect: () => void, params: any[]) => {
  useEffect(() => {
    effect();
  }, params); // eslint-disable-line react-hooks/exhaustive-deps
};
