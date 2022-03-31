import { createContext, useContext } from 'react';

export const ExecutableApplicationContext = createContext<{
  loading: boolean;
  executeApplication: (jobId: string, applicationCode: string) => Promise<void>;
  isExecutable: (applicationCode: string) => Promise<boolean>;
}>({
  loading: false,
  executeApplication: () => new Promise<void>((e) => 'no valid context'),
  isExecutable: () => Promise.resolve(true)
});

export const useExecutableApplicationContext = () => useContext(ExecutableApplicationContext);
