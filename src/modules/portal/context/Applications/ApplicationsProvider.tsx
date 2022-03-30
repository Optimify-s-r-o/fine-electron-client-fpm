import { useAuthContext } from 'modules/auth/context/AuthContext';
import { useState } from 'react';
import API from 'utils/api';
import { useApi } from 'utils/hooks/useApi';
import { useEffectAsync } from 'utils/useEffectAsync';

import { ApplicationDto, ApplicationDtoPaginatedCollection } from '../../../../api/generated/api';
import { ApplicationContext } from './ApplicationsContext';

export const ApplicationsProvider = ({ children }: { children: JSX.Element }) => {
  const [applications, setApplications] = useState<ApplicationDto[]>([]);
  const { user, isLogged, loading: userLoading } = useAuthContext();

  const [getApplications, { loading: applicationLoading }] =
    useApi<ApplicationDtoPaginatedCollection>();

  // Fetch applications during portal startup
  useEffectAsync(async () => {
    if (isLogged && !userLoading) {
      const res = await getApplications(() =>
        API.ApplicationsApi.fineProjectManagerApiApplicationsNoPaginationGet()
      );
      setApplications(res.data as ApplicationDto[]);
    }
  }, [isLogged, user, userLoading]);

  return (
    <ApplicationContext.Provider
      value={{
        applications: applications,
        loading: applicationLoading
      }}>
      {children}
    </ApplicationContext.Provider>
  );
};
