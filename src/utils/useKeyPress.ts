import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export const useKeyPress = (
  targetKey: string,
  callback: (event: any) => void,
  deps: any,
  node = null
) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === targetKey) {
        callbackRef.current(event);
      }
    },
    [targetKey]
  );

  useEffect(() => {
    const targetNode = node ?? document;

    targetNode?.addEventListener('keydown', handleKeyPress);

    return () => {
      targetNode?.removeEventListener('keydown', handleKeyPress);
    };
  }, [node, deps]);
};
