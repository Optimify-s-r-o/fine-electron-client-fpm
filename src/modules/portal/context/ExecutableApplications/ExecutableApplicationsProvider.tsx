import { ExecutableApplicationContext } from './ExecutableApplicationsContext';

export const ExecutableApplicationsProvider = ({ children }: { children: JSX.Element }) => {
  const executeApplication = async () => {
    try {
      const { stdout, stderr } = await window.API.execFile(
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        ['-token', 'xxxxxx', '-projectId', 'asdas-dasdas-das-dasdas']
      );
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    } catch (e) {
      console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
  };

  return (
    <ExecutableApplicationContext.Provider
      value={{
        loading: false,
        executeApplication
      }}>
      {children}
    </ExecutableApplicationContext.Provider>
  );
};
