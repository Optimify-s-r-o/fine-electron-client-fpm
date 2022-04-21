import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { APPLICATION_EXE_PATH } from '../../../../_types';
import { config } from '../../../../utils/api';
import { ExecutableApplicationContext } from './ExecutableApplicationsContext';

export const ExecutableApplicationsProvider = ({ children }: { children: JSX.Element }) => {
  const { t } = useTranslation(['portal']);

  const isExecutable = async (applicationCode: string) => {
    const path = await window.API.invoke('ELECTRON_STORE_GET', {
      name: `${APPLICATION_EXE_PATH}${applicationCode}`
    });

    if (!path) return null;

    return path;
  };

  const createJob = async (projectId: string, applicationCode: string) => {
    return await executeApplication(applicationCode, ['-e', 'createJob', '-projectId', projectId]);
  };

  const updateJob = async (jobId: string, applicationCode: string) => {
    return await executeApplication(applicationCode, ['-e', 'updateJob', '-jobId', jobId]);
  };

  const importJob = async ( projectId: string, path: string, applicationCode: string ) => {
    return await executeApplication(applicationCode, ['-e', 'importJob', '-projectId', projectId, '-path', path]);
  }

  const executeBareApplication = async (applicationCode: string) => {
    return await executeApplication(applicationCode, []);
  };

  const executeApplication = async (applicationCode: string, params: string[]) => {
    try {
      toast.info(t('portal:executeApplication.applicationStarting'));

      const path = await isExecutable(applicationCode);

      if (!path) {
        toast.warn(t('portal:executeApplication.missingPath'));
        return;
      }

      const url = config.basePath;

      const token = await window.API.keytarGetSecret('token');

      const args = [...params, ...['-mode', 'fpm', '-serverUrl', url, '-token', token]];

      console.log(args);

      await window.API.execFile(path, args);
    } catch (e) {
      toast.error(t('portal:executeApplication.applicationFailed'));
    }
  };

  return (
    <ExecutableApplicationContext.Provider
      value={{
        loading: false,
        executeBareApplication,
        createJob,
        updateJob,
        importJob,
        isExecutable
      }}>
      {children}
    </ExecutableApplicationContext.Provider>
  );
};
