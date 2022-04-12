import { useAuthContext } from 'modules/auth/context/AuthContext';
import { useState } from 'react';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import { useEffectAsync } from 'utils/useEffectAsync';

import {
  ApplicationDto,
  ApplicationDtoPaginatedCollection,
  ApplicationUpdateRequest
} from '../../../../api/generated/api';
import { ApplicationContext } from './ApplicationsContext';
import { APPLICATION_EXE_PATH } from '../../../../_types';

export const ApplicationsProvider = ({ children }: { children: JSX.Element }) => {
  const [applications, setApplications] = useState<ApplicationDto[]>([]);
  const { user, isLogged, loading: userLoading } = useAuthContext();

  const [getApplications, { loading: applicationLoading }] =
    useApi<ApplicationDtoPaginatedCollection>();

  const [updateApplication, { loading: updateLoading }] = useApi<
    ApplicationDto,
    ApplicationUpdateRequest
  >();

  useEffectAsync(async () => {
    if (isLogged && !userLoading) {
      const res = await getApplications(() =>
        API.ApplicationsApi.fineProjectManagerApiApplicationsNoPaginationGet()
      );
      setApplications(res.data as ApplicationDto[]);
    }
  }, [isLogged, user, userLoading]);

  const refetch = async () => {
    const res = await getApplications(() =>
      API.ApplicationsApi.fineProjectManagerApiApplicationsNoPaginationGet()
    );
    setApplications(res.data as ApplicationDto[]);
  };

  const getApplicationByCode = (applicationCode: string | null | undefined) => {
    if (!applicationCode) return null;

    if (applicationLoading) return null;

    const res = applications.filter((e) => e.code === applicationCode);

    if (res.length === 0) return null;

    return res[0];
  };

  const getApplicationExePath = async (applicationCode: string | null) => {
    if (!applicationCode) return null;

    const res = await window.API.invoke('ELECTRON_STORE_GET', {
      name: `${APPLICATION_EXE_PATH}${applicationCode}`
    });

    if (!res) return null;
    return res as string;
  };

  const setApplicationExePath = async (exePath: string, applicationCode: string) => {
    await window.API.invoke('ELECTRON_STORE_SET', {
      name: `${APPLICATION_EXE_PATH}${applicationCode}`,
      value: exePath
    });
  };

  const setApplicationExtensions = async (updatedApplication: ApplicationDto) => {
    await updateApplication(() =>
      API.ApplicationsApi.fineProjectManagerApiApplicationsPut(updatedApplication)
    );
    await refetch();
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications: applications,
        loading: applicationLoading,
        refetch: refetch,
        getApplicationByCode: getApplicationByCode,
        getApplicationExePath: getApplicationExePath,
        setApplicationExePath: setApplicationExePath,
        setApplicationExtensions: setApplicationExtensions,
        updateLoading
      }}>
      {children}
    </ApplicationContext.Provider>
  );
};
