import { createContext, useContext } from 'react';

export const ExecutableApplicationContext = createContext<{
  loading: boolean;
  executeApplication: (applicationId: string) => void;
  isExecutable: (applicationId: string) => Promise<boolean>;
}>({
  loading: false,
  executeApplication: () => console.log('No valid context'),
  isExecutable: () => Promise.resolve(true)
});

export const useExecutableApplicationContext = () => useContext(ExecutableApplicationContext);
