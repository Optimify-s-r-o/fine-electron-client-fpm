import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export const useShortcuts = (targetKey: string, callback: (event: any) => void) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event) => {
      if (event.code === targetKey && event.ctrlKey) {
        callbackRef.current(event);
      }
    },
    [targetKey]
  );

  useEffect(() => {
    document?.addEventListener('keydown', handleKeyPress);

    return () => {
      document?.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
