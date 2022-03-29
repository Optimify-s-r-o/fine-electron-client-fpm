import { ExecutableApplicationContext } from './ExecutableApplicationsContext';

export const ExecutableApplicationsProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <ExecutableApplicationContext.Provider
      value={{
        loading: false
      }}
    >
      {children}
    </ExecutableApplicationContext.Provider>
  );
};
