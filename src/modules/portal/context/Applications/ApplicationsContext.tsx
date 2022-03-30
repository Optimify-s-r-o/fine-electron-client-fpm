import { createContext, useContext } from 'react';

import { ApplicationDto } from '../../../../api/generated/api';

interface IApplicationsContextType {
  applications: ApplicationDto[];
  loading: boolean;
  refetch: () => Promise<void>;
  getApplicationIconLink: ( applicationCode: string ) => string | null;
}

export const ApplicationContext = createContext<IApplicationsContextType>( {
  applications: [],
  loading: false,
  getApplicationIconLink: ( applicationCode: string ) => null,
  refetch: () => new Promise<void>( e => 'no valid context' )
} );

export const useApplicationContext = () => useContext( ApplicationContext );
