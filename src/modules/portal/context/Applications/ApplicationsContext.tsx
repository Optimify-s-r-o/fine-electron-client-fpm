import { createContext, useContext } from 'react';

import { ApplicationDto } from '../../../../api/generated/api';

interface IApplicationsContextType {
  applications: ApplicationDto[];
  loading: boolean;
  refetch: () => Promise<void>;
  getApplicationByCode: (applicationCode: string | null | undefined) => ApplicationDto | null;
  setApplicationExePath: (exePath: string, applicationCode: string) => Promise<void>;
  getApplicationExePath: (applicationCode: string) => Promise<string | null>;
  setApplicationExtensions: (updatedApplication: ApplicationDto) => Promise<void>;
  updateLoading: boolean;
}

export const ApplicationContext = createContext<IApplicationsContextType>({
  applications: [],
  loading: false,
  getApplicationByCode: (applicationCode: string | null | undefined) => null,
  refetch: () => new Promise<void>((e) => 'no valid context'),
  setApplicationExePath: () => new Promise<void>((e) => 'no valid context'),
  getApplicationExePath: () => new Promise<string>((e) => 'no valid context'),
  setApplicationExtensions: () => new Promise<void>((e) => 'no valid context'),
  updateLoading: false
});

export const useApplicationContext = () => useContext(ApplicationContext);
