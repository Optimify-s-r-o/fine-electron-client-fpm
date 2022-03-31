import { ExecutableApplicationContext } from './ExecutableApplicationsContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { APPLICATION_EXE_PATH } from '../../../../_types';

export const ExecutableApplicationsProvider = ({ children }: { children: JSX.Element }) => {
  const { t } = useTranslation(['portal']);

  const isExecutable = async (applicationCode: string) => {
    const path = await window.API.invoke('ELECTRON_STORE_GET', {
      name: `${APPLICATION_EXE_PATH}${applicationCode}`
    });

    if (!path) return false;

    return true;
  };

  const executeApplication = async (jobId: string, applicationCode: string) => {
    try {
      toast.info(t('portal:executeApplication.applicationStarting'));

      const token = await window.API.keytarGetSecret('token');

      const path = await window.API.invoke('ELECTRON_STORE_GET', {
        name: `${APPLICATION_EXE_PATH}${applicationCode}`
      });

      if (!path) {
        toast.warn(t('portal:executeApplication.missingPath'));
        return;
      }

      const { stdout, stderr } = await window.API.execFile(path, [
        '-token',
        token,
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
        executeApplication,
        isExecutable
      }}>
      {children}
    </ExecutableApplicationContext.Provider>
  );
};
