import { createContext, useContext } from 'react';

export const ExecutableApplicationContext = createContext<{
  loading: boolean;
  executeApplication: () => void;
}>({
  loading: false,
  executeApplication: () => console.log('No valid context')
});

export const useExecutableApplicationContext = () => useContext(ExecutableApplicationContext);
