import { createContext, useContext } from 'react';

import { ApplicationDto } from '../../../../api/generated/api';

interface IApplicationsContextType {
  applications: ApplicationDto[];
  loading: boolean;
  refetch: () => Promise<void>;
}

export const ApplicationContext = createContext<IApplicationsContextType>( {
  applications: [],
  loading: false,
  refetch: () => new Promise<void>( e => 'no valid context' )
} );

export const useApplicationContext = () => useContext( ApplicationContext );
