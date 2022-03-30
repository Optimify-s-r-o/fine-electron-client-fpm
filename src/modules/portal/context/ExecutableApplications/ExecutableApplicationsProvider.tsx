import { ExecutableApplicationContext } from './ExecutableApplicationsContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const ExecutableApplicationsProvider = ({ children }: { children: JSX.Element }) => {
  const { t } = useTranslation(['portal']);

  const executeApplication = async (applicationId: string) => {
    try {
      toast.info(t('portal:executeApplication.applicationStarting'));

      const path = await window.API.invoke('ELECTRON_STORE_GET', { name: applicationId });

      if (!path) {
        toast.warn(t('portal:executeApplication.missingPath'));
        return;
      }

      const { stdout, stderr } = await window.API.execFile(path, [
        '-token',
        'xxxxxx',
        '-projectId',
        'asdas-dasdas-das-dasdas'
      ]);

      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    } catch (e) {
      toast.error(t('portal:executeApplication.applicationFailed'));
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
