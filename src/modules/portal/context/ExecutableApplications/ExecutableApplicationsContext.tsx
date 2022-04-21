import { createContext, useContext } from 'react';

export const ExecutableApplicationContext = createContext<{
  loading: boolean;
  createJob: (projectId: string, applicationCode: string) => Promise<void>;
  updateJob: (jobId: string, applicationCode: string) => Promise<void>;
  importJob: ( projectId: string, path: string, applicationCode: string ) => Promise<void>;
  executeBareApplication: (applicationCode: string) => Promise<void>;
  isExecutable: (applicationCode: string) => Promise<boolean>;
}>({
  loading: false,
  createJob: () => new Promise<void>((e) => 'no valid context'),
  updateJob: () => new Promise<void>((e) => 'no valid context'),
  importJob: () => new Promise<void>((e) => 'no valid context'),
  executeBareApplication: () => new Promise<void>((e) => 'no valid context'),
  isExecutable: () => Promise.resolve(true)
});

export const useExecutableApplicationContext = () => useContext(ExecutableApplicationContext);
